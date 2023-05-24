import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { createStudentSchema } from "../schemas/students.schemas.js";
import { createStudent } from "../controllers/students.controller.js";

const studentsRouter = Router();

studentsRouter.post("/students", validateSchema(createStudentSchema), createStudent)

export default studentsRouter;