import { Router } from "express";
import { createRequest } from "../services/requests/createRequest";
import { getRequestById } from "../services/requests/getRequestById"
import { getAllRequests } from "../services/requests/getAllRequests";
import { getEmployeeRequests } from "../services/requests/getEmployeeRequests";
import { updateRequestStatus } from "../services/requests/updateRequestStatus";

const router = Router();

// ✅ Create a Request (Leave/Document)
router.post("/", async (req, res) => {
    try {
        const result = await createRequest(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(`Error making request: ${error}`);
    }
});

// ✅ Get All Requests (Admin/Head)
router.get("/", async (_, res) => {
    try {
        const result = await getAllRequests();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`Error getting requests: ${error}`);
    }
});

router.get("/:requestId", async (req, res) => {
    try {
        const { requestId } = req.params;
        const result = await getRequestById(requestId);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`Error getting request: ${error}`);
    }
})

// ✅ Update Request Status (Approve/Reject)
router.put("/:requestId", async (req, res) => {
    try {
        const { requestId } = req.params;
        const { reqStatus } = req.body;
        const result = await updateRequestStatus(requestId, reqStatus);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`Error updating request: ${error}`);
    }
});

// ✅ Get Requests by Employee ID
router.get("/employee/:employeeId", async (req, res) => {
    try {
        const { employeeId } = req.params;
        const result = await getEmployeeRequests(employeeId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`Error getting employee request: ${error}`);
    }
});

export default router;

