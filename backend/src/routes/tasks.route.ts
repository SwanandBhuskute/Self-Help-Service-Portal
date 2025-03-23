import { Router } from "express";
import { createTask } from "../services/tasks/createTask";
import { getTasksPerTeam } from "../services/tasks/getTasksPerTeam";
import { getTaskById } from "../services/tasks/getTaskById";
import { createCommentOnTask } from "../services/tasks/createCommentOnTask";
import { deleteTaskById } from "../services/tasks/deleteTaskById";
import { updateTask } from "../services/tasks/updateTask";
import { updateTaskStatus } from "../services/tasks/updateTaskStatus";
import { Task } from "../models/task.interface";

const router = Router();

router.post("/", async (req, res) => {

    try {
        const { title, description, taskStatus, assignedTo, teamId, project, createdBy, deadline, priority, estimate } = req.body;
    
        const task : Task = {
            title, description, taskStatus, assignedTo, teamId, project, createdBy, deadline, priority, estimate,
        }
    
        const result = await createTask(task);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error creating task: ${error}`);
    }
})

router.get("/", async (req, res) => {
    try {
        const { teamId } = req.query;

        const tasks = await getTasksPerTeam(teamId);
        
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send(`Error getting tasks: ${error}`);
    }
})

router.get("/:taskId", async (req, res) => {
    try{
        const { taskId } = req.params;
    
        const task = await getTaskById(taskId);
    
        res.status(200).json(task);
    } catch (error) {
        res.status(500).send(`Error getting task: ${error}`);
    }
})

router.put("/:taskId", async (req, res) => {
    try{
        const { taskId } = req.params;
        const updateFields = req.body;
    
        const task = await updateTask(taskId, updateFields);
    
        res.status(200).json(task);
    } catch (error) {
        res.status(500).send(`Error getting task: ${error}`);
    }
})

router.delete("/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;

        const result = await deleteTaskById(taskId);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error deleting task: ${error}`);
    }
});

router.put("/:taskId/status", async (req, res) => {
    try {
        const { taskId } = req.params;
        const { taskStatus } = req.body;

        const result = await updateTaskStatus(taskId, taskStatus);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error updating status: ${error}`);
    }
})

router.post("/:taskId/comments", async (req, res) => {
    try {
        const { taskId } = req.params;
        const { employeeId, content } = req.body;

        const result = await createCommentOnTask(taskId, employeeId, content);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error adding comment: ${error}`);
    }
})

export default router;
