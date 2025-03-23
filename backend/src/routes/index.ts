import { Router } from "express";
import users from "./users.route";
import attendance from "./attendance.route"
import requests from "./requests.route"
import finance from "./finance.route"
import documents from "./documents.route";
import tasks from "./tasks.route"
import taskRequests from "./taskRequests.route"

const router = Router();

router.use("/users", users);
router.use("/attendance", attendance);
router.use("/requests", requests);
router.use("/finance", finance);
router.use("/documents", documents);
router.use("/tasks", tasks);
router.use("/task-requests", taskRequests);


export default router;