import joi from "joi";

export const createClassSchema = joi.object({
    code: joi.string().required(),
    startDate: joi.date().required(),
    endDate: joi.date(),
});