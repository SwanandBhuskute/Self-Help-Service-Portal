import { Request, Response, Router } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = [
      { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
    ];
    res.status(200).json(users);
    
  } catch (error: any) {
    console.error("An error ocurred:", error);
    res.status(500).json(error);
  }
});

export default router;