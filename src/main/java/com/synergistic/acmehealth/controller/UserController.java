package com.synergistic.acmehealth.controller;

import com.synergistic.acmehealth.config.security.JwtProvider;
import com.synergistic.acmehealth.domain.Role;
import com.synergistic.acmehealth.domain.User;
import com.synergistic.acmehealth.domain.auth.AuthResponse;
import com.synergistic.acmehealth.service.role.RoleService;
import com.synergistic.acmehealth.service.user.UserDetailsServiceImpl;
import com.synergistic.acmehealth.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired private RoleService roleService;
    @Autowired
    UserDetailsServiceImpl userDetailsService;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        List<Role> roles = new ArrayList<>();
        for(Role role : user.getRoles()) {
            roles.add(roleService.findByName(role.getRoleName()));
        }
        user.setRoles(roles);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestBody User user) {
        userService.deleteUserByUsername(user.getUsername());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/find")
    public ResponseEntity<?> getUserByUsername(@RequestParam String username) {
        return new ResponseEntity<>(userService.getUserByUsername(username), HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> getAllUsers(){
        List<User> users = userService.getAllUsers();
        List<Role> roles1 = new ArrayList<>();
        for(User user : users) {
            List<Role> roles = user.getRoles();
            for(Role role : roles) {
                Role role1 = roleService.findByName(role.getRoleName());
                roles1.add(role1);
            }
            user.setRoles(roles1);
        }

        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody User loginRequest) {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        System.out.println(username+"-------"+password);

        Authentication authentication = authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();

        authResponse.setMessage("Login success");
        authResponse.setJwt(token);
        authResponse.setStatus(true);

        return new ResponseEntity<>(authResponse,HttpStatus.OK);
    }


    private Authentication authenticate(String username, String password) {
        System.out.println(username+"---++----"+password);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        System.out.println("Sig in in user details"+ userDetails);
        if(userDetails == null) {
            System.out.println("Sign in details - null" + userDetails);
            throw new BadCredentialsException("Invalid username and password");        }
        if(!bCryptPasswordEncoder.matches(password,userDetails.getPassword())) {
            System.out.println("Sign in userDetails - password mismatch"+userDetails);
            throw new BadCredentialsException("Invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

    }
}
