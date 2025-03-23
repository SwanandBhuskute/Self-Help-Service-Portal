import { Router } from "express";
import { getTeamFinance } from "../services/finance/getTeamFinance";
import { getEmployeeFinance } from "../services/finance/getEmployeeFinance";
import { markSalaryPaid } from "../services/finance/markSalaryPaid";

const router = Router();

router.post("/pay", async (req, res) => {
    try {
        const { employeeId, team, month, amount } = req.body;
        const result = await markSalaryPaid(employeeId, team, month, amount);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`Error marking salary: ${error}`);
    }
});

// ✅ Get Salary Details of an Employee
router.get("/:employeeId", async (req, res) => {
    try {
        const { employeeId } = req.params;
        const result = await getEmployeeFinance(employeeId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`Error getting salary details: ${error}`);
    }
});

// ✅ Get Aggregated Salaries for a Team
router.get("/team/:teamName", async (req, res) => {
    try {
        const { teamName } = req.params;
        const result = await getTeamFinance(teamName);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`Error getting aggregated salaries: ${error}`);
    }
});

export default router;