package com.synergistic.acmehealth.controller;

import com.synergistic.acmehealth.domain.Role;
import com.synergistic.acmehealth.domain.User;
import com.synergistic.acmehealth.service.role.RoleService;
import com.synergistic.acmehealth.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class SignupController {
    @Autowired private UserService userService;
    @Autowired private RoleService roleService;
    @Autowired private BCryptPasswordEncoder bCryptPasswordEncoder;

    @RequestMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        Role role = roleService.findByName("USER");
        List<Role> roles = new ArrayList<>();
        roles.add(role);
        user.setRoles(roles);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        User savedUser = userService.createUser(user);
        return ResponseEntity.ok(savedUser);
    }
}
