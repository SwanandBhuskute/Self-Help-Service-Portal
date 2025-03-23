import { Router } from "express";
import { markEmployeeAttendance } from "../services/attendance/markEmployeeAttendance";
import { getEmployeeAttendance } from "../services/attendance/getEmployeeAttendance";

const router = Router();

router.post("/", async (req, res) => {
    try {
        console.log("req: ", req);
        const { employeeId, date, status } = req.body;
        const result = await markEmployeeAttendance(employeeId, date, status);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error marking attendance: ${error}`);
    }
});

router.get("/:employeeId", async (req, res) => {
    try {
        console.log("req: ", req);
        const { employeeId } = req.params;
        const result = await getEmployeeAttendance(employeeId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error getting employee attendance: ${error}`);
    }
});

// router.get("/team/:team_id", async (req, res) => {
//     try {
//         const { team_id } = req.params;
//         const { date } = req.query;
//         const result = await getTeamAttendance(team_id, date);
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).send(`Error getting team attendance: ${error}`);
//     }
// });


export default router;