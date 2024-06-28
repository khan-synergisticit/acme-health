package com.synergistic.acmehealth.service.role;

import com.synergistic.acmehealth.domain.Role;
import com.synergistic.acmehealth.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired private RoleRepository roleRepository;

    @Override
    public Role save(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Role update(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void delete(Role role) {
        roleRepository.delete(role);
    }

    @Override
    public Role findById(String id) {
        return roleRepository.findById(id).orElse(null);
    }

    @Override
    public List<Role> findAll() {
        List<Role> roles = roleRepository.findAll();
        return roles;
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByRoleName(name);
    }
}
