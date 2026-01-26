package com.taskmanagement.TaskManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "nvarchar(max)")
    private String description;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "assigned_to_id")
    private Long assignedToId;

    @Column(name = "created_by_id", nullable = false)
    private Long createdById;

    @Column(length = 20)
    private String status;

    @Column(length = 20)
    private String priority;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "estimated_hours", precision = 5, scale = 2)
    private BigDecimal estimatedHours;

    @Column(name = "actual_hours", precision = 5, scale = 2)
    private BigDecimal actualHours;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
