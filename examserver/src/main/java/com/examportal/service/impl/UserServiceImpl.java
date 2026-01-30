package com.examportal.service.impl;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examportal.helper.UserFoundException;
import com.examportal.model.User;
import com.examportal.model.UserRole;
import com.examportal.repository.RoleRepository;
import com.examportal.repository.UserRepository;
import com.examportal.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	// create operation
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		User local = userRepository.findByUsername(user.getUsername());
		if (local != null) {
			logger.warn("User already exists with username: {}", user.getUsername());
			throw new UserFoundException();
		} else {
			for (UserRole ur : userRoles) {
				roleRepository.save(ur.getRole());
			}

			user.getUserRoles().addAll(userRoles);
			local = userRepository.save(user);
		}

		return local;
	}

	@Override
	public User getUser(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}
}