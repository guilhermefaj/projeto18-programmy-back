import { Router } from "express";
import studentsRouter from "./students.routes.js";
import enrollmentsRouter from "./classes.routes.js";

const router = Router();
router.use(studentsRouter);
router.use(enrollmentsRouter);

export default router;