package com.synergistic.acmehealth.service.role;

import com.synergistic.acmehealth.domain.Role;

import java.util.List;

public interface RoleService {
    Role save(Role role);
    Role update(Role role);
    void delete(Role role);
    Role findById(String id);
    List<Role> findAll();
    Role findByName(String name);
}
