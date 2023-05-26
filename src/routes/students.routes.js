import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { createStudentSchema } from "../schemas/students.schemas.js";
import { createStudent, getStudent, showStudents, studentsByClass } from "../controllers/students.controller.js";
import { classValidationByBody } from "../middlewares/student.middleware.js";

const studentsRouter = Router();

studentsRouter.post("/students/register", validateSchema(createStudentSchema), classValidationByBody, createStudent);
studentsRouter.get("/students/:studentId", getStudent);
studentsRouter.get("/students", showStudents);
studentsRouter.get("/students/classes/:classId", studentsByClass);

export default studentsRouter;