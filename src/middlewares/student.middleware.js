import { db } from "../database/database.connection.js";

export async function userValidation(req, res, next) {
    const { studentId } = req.params;

    const studentResult = await db.query(
        `SELECT * FROM 
        students WHERE 
        id = $1;`,
        [studentId]);

    if (studentResult.rowCount === 0) {
        return res.status(404).send('Aluno não encontrado');
    }

    next();
}

export async function classValidation(req, res, next) {
    const { classId } = req.body;

    const classResult = await db.query(
        `SELECT * FROM 
        classes WHERE 
        id = $1`,
        [classId]);

    if (classResult.rowCount === 0) {
        return res.status(404).send('Turma não encontrada');
    }

    next();
}