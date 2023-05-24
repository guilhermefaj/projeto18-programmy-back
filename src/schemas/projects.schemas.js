import joi from "joi";

export const createProjectSchema = joi.object({
    classId: joi.number().required(),
    projectName: joi.string().required(),
});