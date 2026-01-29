package com.examportal.controller;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.config.JwtUtils;
import com.examportal.helper.UserNotFoundException;
import com.examportal.model.JwtRequest;
import com.examportal.model.JwtResponse;
import com.examportal.model.User;
import com.examportal.service.impl.UserDetailsServiceImpl;

@RestController
public class AuthenticationController {

	private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private JwtUtils jwtUtil;

	@PostMapping("/generate-token")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		try {
			authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
		} catch (UserNotFoundException e) {
			logger.error("User not found: {}", e.getMessage());
			throw new Exception("User not Found!");
		}

		UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());
		String token = jwtUtil.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			logger.error("User disabled: {}", e.getMessage());
			throw new Exception("USER DISABLED! " + e.getMessage());
		} catch (BadCredentialsException e) {
			logger.warn("Invalid credentials for user: {}", username);
			throw new Exception("Invalid Credentials! " + e.getMessage());
		}
	}

	@GetMapping("/current-user")
	public User getCurrentUser(Principal principal) {
		return ((User) userDetailsService.loadUserByUsername(principal.getName()));
	}
}