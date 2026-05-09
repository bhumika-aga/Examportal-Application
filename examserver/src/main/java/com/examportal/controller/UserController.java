package com.examportal.controller;

import com.examportal.helper.UserFoundException;
import com.examportal.model.Role;
import com.examportal.model.User;
import com.examportal.model.UserRole;
import com.examportal.repository.RoleRepository;
import com.examportal.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserController {
    
    private final UserService userService;
    
    private final BCryptPasswordEncoder passwordEncoder;
    
    private final RoleRepository roleRepository;
    
    public UserController(UserService userService, BCryptPasswordEncoder passwordEncoder,
                          RoleRepository roleRepository) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }
    
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {
        user.setProfile("default.png");
        
        // password encoding
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        Set<UserRole> roles = new HashSet<>();
        
        Role role = roleRepository.findByRoleName("NORMAL");
        if (role == null) {
            role = new Role();
            role.setRoleId(45L); // Keep ID for compatibility if needed, or let DB generate
            role.setRoleName("NORMAL");
        }
        
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        
        roles.add(userRole);
        
        return userService.createUser(user, roles);
    }
    
    @GetMapping("/{username}")
    public User getUser(@PathVariable String username) {
        
        return userService.getUser(username);
    }
    
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }
    
    @ExceptionHandler(UserFoundException.class)
    public ResponseEntity<?> exceptionHandler(UserFoundException ex) {
        return ResponseEntity.ok(ex.getMessage());
    }
}