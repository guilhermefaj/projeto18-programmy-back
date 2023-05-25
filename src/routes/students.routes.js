import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { createStudentSchema } from "../schemas/students.schemas.js";
import { createStudent, getStudentsByClass } from "../controllers/students.controller.js";
import { classValidationByBody, classValidationByParams, studentValidation } from "../middlewares/student.middleware.js";

const studentsRouter = Router();

studentsRouter.post("/students/register", validateSchema(createStudentSchema), studentValidation, classValidationByBody, createStudent)
studentsRouter.get("/students/:classId", classValidationByParams, getStudentsByClass)

export default studentsRouter;