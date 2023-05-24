import joi from "joi";

export const createSubmissionSchema = joi.object({
    studentId: joi.number().required(),
    projectId: joi.number().required(),
    submissionDate: joi.date().required(),
    repositoryLink: joi.string().required(),
    gradeId: joi.number(),
});