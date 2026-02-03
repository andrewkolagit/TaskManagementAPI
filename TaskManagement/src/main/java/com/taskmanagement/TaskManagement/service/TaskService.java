package com.taskmanagement.TaskManagement.service;

import com.taskmanagement.TaskManagement.entity.Task;
import com.taskmanagement.TaskManagement.exception.ResourceNotFoundException;
import com.taskmanagement.TaskManagement.exception.UnauthorizedException;
import com.taskmanagement.TaskManagement.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserService userService;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
    }

    public List<Task> getTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    public List<Task> getTasksByAssignedToId(Long assignedToId) {
        return taskRepository.findByAssignedToId(assignedToId);
    }

    public Task createTask(Task task) {
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = getTaskById(id);
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setAssignedToId(taskDetails.getAssignedToId());
        task.setStatus(taskDetails.getStatus());
        task.setPriority(taskDetails.getPriority());
        task.setDueDate(taskDetails.getDueDate());
        task.setEstimatedHours(taskDetails.getEstimatedHours());
        task.setActualHours(taskDetails.getActualHours());
        task.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task not found with id: " + id);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        var currentUser = userService.getUserByUsername(username);

        Task task = getTaskById(id);

        Long currentUserId = currentUser.getId();
        Long taskCreatorId = task.getCreatedById();
        Long taskAssignedId = task.getAssignedToId();

        boolean isCreator = taskCreatorId != null && taskCreatorId.equals(currentUserId);
        boolean isAssignedUser = taskAssignedId != null && taskAssignedId.equals(currentUserId);

        if (!isCreator && !isAssignedUser) {
            throw new UnauthorizedException("You are not authorized to delete this task");
        }

        taskRepository.deleteById(id);
    }
}
