import joi from "joi";

export const createEnrollmentSchema = joi.object({
    studentId: joi.number().required(),
    classId: joi.number().required(),
    enrollmentDate: joi.date().required(),
    exitDate: joi.date(),
});