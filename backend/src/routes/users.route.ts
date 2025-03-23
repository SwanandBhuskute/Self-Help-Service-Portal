import { Request, Response, Router } from "express";
import { registerAdmin } from "../services/users/registerAdmin";
import { loginAdmin } from "../services/users/loginAdmin";
import { createEmployee } from "../services/users/createEmployee";
import { loginEmployee } from "../services/users/loginEmployee";

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
    res.json(result);
  } catch (error) {
    res.status(500).send(`Error login as admin: ${error}`);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];
    res.status(200).json(users);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("An error ocurred:", error);
    res.status(500).json(error);
  }
});

export default router;
