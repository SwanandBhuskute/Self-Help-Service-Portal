import { Router } from "express";
import multer from "multer";
import { uploadDocument } from "../services/documents/uploadDocument";
import { getAllDocuments } from "../services/documents/getAllDocuments";
import { getDocumentsByEmployee } from "../services/documents/getDocumentForEmployee";


const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
    try {
        const { adminId, employeeId, type } = req.body;
        const file  = req.file as Express.Multer.File;

        const result = await uploadDocument(file, adminId, employeeId, type);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error uploading document: ${error}`);
    }
});

router.get("/", async (_req, res) => {
    try {
        const result = await getAllDocuments();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error fetching documents: ${error}`);
    }
});

router.get("/:employeeId", async (req, res) => {
    try {
        const { employeeId } = req.params;
        const result = await getDocumentsByEmployee(employeeId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error fetching employee documents: ${error}`);
    }
});

export default router;
