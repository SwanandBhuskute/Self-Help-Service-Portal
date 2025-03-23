import { Router } from "express";
import { registerAdmin } from "../services/users/registerAdmin";
import { loginAdmin } from "../services/users/loginAdmin";
import { createEmployee } from "../services/users/createEmployee";
import { loginEmployee } from "../services/users/loginEmployee";
import { createTeam } from "../services/users/createTeam";
import { getAllTeams } from "../services/users/getTeams";
import { getTeamById } from "../services/users/getTeamById";
import { updateTeam } from "../services/users/updateTeamById";
import { deleteTeam } from "../services/users/deleteTeamById";
import { getAllEmployees } from "../services/users/getAllEmployees";
import { getEmployeeById } from "../services/users/getEmployeeById";

const router = Router();

router.post("/admin/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "Missing required fields" });
    }

    const result = await registerAdmin(username, email, password);
    res.status(201).json({ message: "Admin registered successfully", data: result });
  } catch (error) {
    res.status(500).send(`Error registering as admin: ${error}`);
  }
})

router.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Missing required fields" });
    }

    const result = await loginAdmin(username, password);
    res.json({ message: "Admin loggedin successfully", data: result });
  } catch (error) {
    res.status(500).send(`Error login as admin: ${error}`);
  }
});

router.post("/admin/employees", async (req, res) => {
  try {
    const { username, password, employeeData } = req.body;
    const result = await createEmployee(username, password, employeeData);
    res.json(result);
  } catch (error) {
    res.status(500).send(`Error creating employee: ${error}`);
  }
});

router.post("/employee/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginEmployee(username, password);
    res.json({ message: "Employee loggedin successfully", data: result });
  } catch (error) {
    res.status(500).send(`Error login as admin: ${error}`);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await getEmployeeById(userId);
    res.status(200).json(result)
  } catch (error) {
    res.status(500).send(`Error getting user: ${error}`);
  }
})

router.get("/", async (req, res) => {
  try {
    const result = await getAllEmployees();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(`Error getting user: ${error}`);
  }
});

router.post("/teams", async (req, res) => {
  try {
    const { teamName, headId } = req.body;
    const result = await createTeam(teamName, headId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(`Error creating team: ${error}`);
  }
});

router.get("/teams", async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).send(`Error getting teams: ${error}`);
  }
})

router.get("/teams/:teamId", async (req, res) => {
  try {
      const { teamId } = req.params;
      const team = await getTeamById(teamId);
      res.status(200).json(team);
  } catch (error) {
      res.status(500).send(`Error fetching team: ${error}`);
  }
});

router.put("/teams/:teamId", async (req, res) => {
  try {
      const { teamId } = req.params;
      const updateFields = req.body;
      const result = await updateTeam(teamId, updateFields);
      res.status(200).json(result);
  } catch (error) {
      res.status(500).send(`Error updating team: ${error}`);
  }
});

router.delete("/teams/:teamId", async (req, res) => {
  try {
      const { teamId } = req.params;
      const result = await deleteTeam(teamId);
      res.status(200).json(result);
  } catch (error) {
      res.status(500).send(`Error deleting team: ${error}`);
  }
});



export default router;
