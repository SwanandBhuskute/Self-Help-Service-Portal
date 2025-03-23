import { Router } from "express";
import { approveTaskRequest } from "../services/tasksRequests/approveTaskRequest";
import { createTaskRequest } from "../services/tasksRequests/createTaskRequest";
import { escalateTaskRequest } from "../services/tasksRequests/escalateTaskRequest";
import { getInboxRequests, getSentRequests } from "../services/tasksRequests/getTaskRequests";
import { negotiateDeadline } from "../services/tasksRequests/negotiateDeadline";
import { rejectTaskRequest } from "../services/tasksRequests/rejectTaskRequest";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const request = req.body;
        const result = await createTaskRequest(request);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error creating task request: ${error}`);
    }
});

router.get("/inbox", async (req, res) => {
    try {
        const { toTeamId } = req.query;
        const result = await getInboxRequests(toTeamId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error fetching inbox requests: ${error}`);
    }
});

router.get("/sent", async (req, res) => {
    try {
        const { fromTeamId } = req.query ;
        const result = await getSentRequests(fromTeamId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error fetching sent requests: ${error}`);
    }
});

router.patch("/:taskRequestId/negotiate", async (req, res) => {
    try {
        const { taskRequestId } = req.params;
        const { newDeadline } = req.body;
        const result = await negotiateDeadline(taskRequestId, newDeadline);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error negotiating deadline: ${error}`);
    }
});

router.patch("/:taskRequestId/approve", async (req, res) => {
    try {
        const { taskRequestId } = req.params;
        const result = await approveTaskRequest(taskRequestId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error approving task request: ${error}`);
    }
});

router.patch("/:taskRequestId/reject", async (req, res) => {
    try {
        const { taskRequestId } = req.params;
        const { reason } = req.body;
        const result = await rejectTaskRequest(taskRequestId, reason);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error rejecting task request: ${error}`);
    }
});

router.patch("/:taskRequestId/escalate", async (req, res) => {
    try {
        const { taskRequestId } = req.params;
        const result = await escalateTaskRequest(taskRequestId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error escalating task request: ${error}`);
    }
});

export default router;
