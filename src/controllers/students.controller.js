import { db } from "../database/database.connection.js";

export async function createStudent(req, res) {
    try {
        const { name, photo, cpf, email } = req.body;

        const result = await db.query(
            `INSERT INTO students 
            (name, photo, cpf, email) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;`,
            [name, photo, cpf, email]);
        res.status(201).send(result.rows[0]);
    } catch (error) {
        res.status(500).send('Erro ao criar novo aluno');
    }
};

export async function getStudentsByClass(req, res) {
    try {
        const { classId } = req.params;

        const getStudentsResult = await db.query(
            `
            SELECT students.*
            FROM students
            INNER JOIN enrollments 
            ON students.id = enrollments."studentId"
            WHERE enrollments."classId" = $1
            `, [classId]);

        const students = getStudentsResult.rows;

        res.status(200).send(students);
    } catch (error) {
        restart.status(500).send('Erro ao selecionar alunos')
    }
}