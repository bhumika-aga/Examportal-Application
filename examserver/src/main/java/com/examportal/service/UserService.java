package com.examportal.service;

import com.examportal.model.User;
import com.examportal.model.UserRole;

import java.util.Set;

public interface UserService {
    
    User createUser(User user, Set<UserRole> userRoles) throws Exception;
    
    User getUser(String username);
    
    void deleteUser(Long id);
}