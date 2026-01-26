package com.taskmanagement.TaskManagement.repository;

import com.taskmanagement.TaskManagement.entity.UserProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProjectRepository extends JpaRepository<UserProject, Long> {
    List<UserProject> findByUserId(Long userId);
    List<UserProject> findByProjectId(Long projectId);
    boolean existsByUserIdAndProjectId(Long userId, Long projectId);
}
