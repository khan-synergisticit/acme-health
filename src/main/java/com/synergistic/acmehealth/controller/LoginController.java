package com.synergistic.acmehealth.controller;

import com.synergistic.acmehealth.config.security.JwtProvider;

import com.synergistic.acmehealth.domain.Role;
import com.synergistic.acmehealth.domain.User;
import com.synergistic.acmehealth.domain.auth.AuthResponse;
import com.synergistic.acmehealth.service.role.RoleService;
import com.synergistic.acmehealth.service.user.UserDetailsServiceImpl;
import com.synergistic.acmehealth.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.catalina.realm.GenericPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
public class LoginController {
    @Autowired
    UserService userService;
    @Autowired
    RoleService roleService;
    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository =
            new HttpSessionSecurityContextRepository();

    public LoginController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
        Authentication authenticationRequest =
                UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.username(), loginRequest.password());
        Authentication authenticationResponse =
                this.authenticationManager.authenticate(authenticationRequest);

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authenticationResponse);
        SecurityContextHolder.setContext(context);

        securityContextRepository.saveContext(context, request, response);
        String token = JwtProvider.generateToken(authenticationResponse);



        AuthResponse authResponse = new AuthResponse();
        authResponse.setAuthenticationResponse(authenticationResponse);
        authResponse.setMessage("Login success");
        authResponse.setJwt(token);
        authResponse.setStatus(true);

        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
    }

//    @GetMapping(value="/logout")
//    public ResponseEntity<AuthResponse> logoutPage (HttpServletRequest request, HttpServletResponse response) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        AuthResponse authResponse = new AuthResponse();
//        if (auth != null){
//            new SecurityContextLogoutHandler().logout(request, response, auth);
//
//            authResponse.setMessage("Logout success");
//            authResponse.setJwt(null);
//            authResponse.setStatus(false);
//            return new ResponseEntity<>(authResponse, HttpStatus.OK);
//        }
//        authResponse.setMessage("Logout success");
//        authResponse.setJwt(null);
//        authResponse.setStatus(false);
//        return new ResponseEntity<>(authResponse, HttpStatus.OK);
//
//    }

    public record LoginRequest(String username, String password) {
    }

}