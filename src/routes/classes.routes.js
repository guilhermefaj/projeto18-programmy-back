import { Router } from "express";
import { getClasses, getClassesByStudent } from "../controllers/classes.controller.js";
import { classValidationByParams } from "../middlewares/student.middleware.js";
import { showStudentsByClass } from "../controllers/students.controller.js";

const classesRouter = Router();

classesRouter.get("/classes", getClasses);
classesRouter.get("/classes/:classId", classValidationByParams, showStudentsByClass)
classesRouter.get("/students/:studentId/classes", getClassesByStudent);

export default classesRouter;