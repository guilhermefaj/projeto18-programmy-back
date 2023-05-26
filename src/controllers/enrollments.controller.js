export async function enrollStudent(req, res) {
    try {
        const { studentId } = req.params;
        const { classId } = req.body;

        const enrollmentResult = await db.query(
            `
        INSERT INTO enrollments 
        ("studentId", "classId", "enrollmentDate")
        VALUES ($1, $2, CURRENT_DATE)
        RETURNING *
        `,
            [studentId, classId]
        );

        const enrollment = enrollmentResult.rows[0];

        const formattedEnrollmentDate = enrollment.enrollmentDate.toISOString().split('T')[0];
        enrollment.enrollmentDate = formattedEnrollmentDate;

        await db.query(
            `
        UPDATE students
        SET "classId" = $1
        WHERE id = $2
        `,
            [classId, studentId]
        );

        res.status(201).send(enrollment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar aluno na turma');
    }
};
