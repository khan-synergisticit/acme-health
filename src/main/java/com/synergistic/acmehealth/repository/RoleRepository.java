package com.synergistic.acmehealth.repository;

import com.synergistic.acmehealth.domain.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Role findByRoleName(String name);
}
