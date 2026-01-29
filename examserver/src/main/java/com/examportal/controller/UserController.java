package com.examportal.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.helper.UserFoundException;
import com.examportal.model.Role;
import com.examportal.model.User;
import com.examportal.model.UserRole;
import com.examportal.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private com.examportal.repository.RoleRepository roleRepository;

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