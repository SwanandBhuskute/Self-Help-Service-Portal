import { Comment } from "./comment.interface";

export interface Task {
    taskId?: string;            // Unique identifier for the task
    title?: string;             // Task title
    description?: string;       // Task details
    taskStatus?: string; // Task status
    assignedTo: string;        // Employee ID assigned to the task
    teamId: string;            // Team responsible for the task
    project: string;           // Project under which this task falls
    createdBy: string;         // Admin/Head who created the task
    deadline: string | null;   // Due date for task completion
    priority: string; // Task priority level
    estimate: string | null;   // Estimated time to complete the task
    comments?: Comment[];      // List of comments on the task (optional)
}
