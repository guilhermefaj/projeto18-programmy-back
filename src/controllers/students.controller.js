import { db } from "../database/database.connection.js";

export async function createStudent(req, res) {
    try {
        const { name, photo, cpf, email, classId } = req.body;

        const result = await db.query(
            `INSERT INTO students 
            (name, photo, cpf, email, "classId") 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
            [name, photo, cpf, email, classId]
        );

        const student = result.rows[0];

        const enrollmentResult = await db.query(
            `INSERT INTO enrollments 
            ("studentId", "classId", "enrollmentDate")
            VALUES ($1, $2, current_date)
            RETURNING *`,
            [student.id, classId]
        );

        const enrollment = enrollmentResult.rows[0];
        const formattedEnrollmentDate = enrollment.enrollmentDate.toISOString().split('T')[0];
        enrollment.enrollmentDate = formattedEnrollmentDate;

        student.enrollment = enrollment;

        res.status(201).send(student);
    } catch (error) {
        console.error(error);
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