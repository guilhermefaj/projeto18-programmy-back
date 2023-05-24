import { db } from "../database/database.connection.js";

export async function enrollStudent(req, res) {
    try {
        const { studentId } = req.params;
        const { classId } = req.body;

        const enrollmentResult = await db.query(
            `
            INSERT INTO enrollments 
            ("studentId", "classId", "enrollmentDate")
            VALUES ($1, $2, CURRENT_DATE)
            ON CONFLICT ("studentId")
            DO UPDATE SET "classId" = EXCLUDED."classId"
            RETURNING *
            `,
            [studentId, classId]);

        const enrollment = enrollmentResult.rows[0];

        const formattedEnrollmentDate = enrollment.enrollmentDate.toISOString().split('T')[0];
        enrollment.enrollmentDate = formattedEnrollmentDate;

        res.status(201).send(enrollment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar aluno na turma');
    }
};