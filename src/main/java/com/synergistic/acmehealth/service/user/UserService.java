package com.synergistic.acmehealth.service.user;

import com.synergistic.acmehealth.domain.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    User updateUser(User user);
    User getUserByUsername(String username);
    void deleteUserByUsername(String username);
    List<User> getAllUsers();
    User getUserByEmail(String email);
}
