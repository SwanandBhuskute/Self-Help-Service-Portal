import { Router } from "express";
import { getUpdateById, getUpdatesByTeamId } from "../services/taskUpdates/getTeamUpdates";
import { createTeamUpdate } from "../services/taskUpdates/createTeamUpdate";
import { updateTeamUpdate } from "../services/taskUpdates/updateTeamUpdate";
import { deleteTeamUpdate } from "../services/taskUpdates/deleteTeamUpdate";

const router = Router();

// ✅ Create a Team Update
router.post("/", async (req, res) => {
    try {
        const updateData = req.body;
        const result = await createTeamUpdate(updateData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error creating team update: ${error}`);
    }
});

// ✅ Get Updates for a Specific Team
router.get("/:teamId", async (req, res) => {
    try {
        const { teamId } = req.params;
        const result = await getUpdatesByTeamId(teamId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error fetching team updates: ${error}`);
    }
});

// ✅ Get Specific Update by ID
router.get("/:updateId", async (req, res) => {
    try {
        const { updateId } = req.params;
        const result = await getUpdateById(updateId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error fetching update: ${error}`);
    }
});

// ✅ Update an Existing Team Update
router.put("/:updateId", async (req, res) => {
    try {
        const { updateId } = req.params;
        const updateFields = req.body;
        const result = await updateTeamUpdate(updateId, updateFields);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error updating team update: ${error}`);
    }
});

// ✅ Delete a Team Update
router.delete("/:updateId", async (req, res) => {
    try {
        const { updateId } = req.params;
        const result = await deleteTeamUpdate(updateId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error deleting team update: ${error}`);
    }
});

export default router;
