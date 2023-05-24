import joi from "joi";

export const createEnrollmentSchema = joi.object({
    classId: joi.number().required(),
    enrollmentDate: joi.date(),
    exitDate: joi.date(),
});