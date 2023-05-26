import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { enrollStudent } from "../controllers/enrollments.controller.js";
import { createEnrollmentSchema } from "../schemas/enrollments.Schemas.js";

const enrollmentsRouter = Router();

enrollmentsRouter.post("/students/:studentId/enrollments", validateSchema(createEnrollmentSchema), enrollStudent);

export default enrollmentsRouter;