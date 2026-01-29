package com.examportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examportal.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    public Role findByRoleName(String roleName);

}