import joi from "joi";

export const createStudentSchema = joi.object({
    name: joi.string().required(),
    photo: joi.string().required(),
    cpf: joi.string().min(11).max(11).required().messages({
        'string.min': 'O CPF deve ter exatamente 11 dígitos',
        'string.max': 'O CPF deve ter exatamente 11 dígitos',
    }),
    email: joi.string().email().required(),
    classId: joi.number().required()
});