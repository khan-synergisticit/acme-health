package com.synergistic.acmehealth.controller;

import com.synergistic.acmehealth.domain.Role;
import com.synergistic.acmehealth.service.role.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/role")
public class RoleController {
    @Autowired private RoleService roleService;

    @PostMapping("/save")
    public ResponseEntity<?> saveRole(@RequestBody Role role) {
        return new ResponseEntity<>(roleService.save(role), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateRole(@RequestBody Role role) {
        return new ResponseEntity<>(roleService.update(role), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteRole(@RequestBody Role role) {
        roleService.delete(role);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> listRoles() {
        return new ResponseEntity<>(roleService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<?> findRoleById(@RequestParam String id) {
        return new ResponseEntity<>(roleService.findById(id), HttpStatus.OK);
    }
}
