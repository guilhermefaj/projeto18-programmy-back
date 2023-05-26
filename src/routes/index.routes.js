import { Router } from "express";
import studentsRouter from "./students.routes.js";
import enrollmentsRouter from "./enrollments.routes.js";
import classesRouter from "./classes.routes.js";
import projectsRouter from "./projects.routes.js";


const router = Router();
router.use(studentsRouter);
router.use(enrollmentsRouter);
router.use(classesRouter);
router.use(projectsRouter);

export default router;