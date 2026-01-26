package com.taskmanagement.TaskManagement.repository;

import com.taskmanagement.TaskManagement.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByOwnerId(Long ownerId);
    List<Project> findByStatus(String status);
    boolean existsByProjectKey(String projectKey);
}
