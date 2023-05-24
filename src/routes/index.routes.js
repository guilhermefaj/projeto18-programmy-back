import { Router } from "express";
import studentsRouter from "./students.routes.js";

const router = Router();
router.use(studentsRouter);

export default router;