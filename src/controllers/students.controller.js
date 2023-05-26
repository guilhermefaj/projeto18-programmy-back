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



export async function showStudentsByClass(req, res) {
    try {
        const { classId } = req.params;

        const studentsResult = await db.query(
            `
            SELECT students.*
            FROM students
            INNER JOIN enrollments ON students.id = enrollments."studentId"
            WHERE enrollments."classId" = $1
            `, [classId]
        );

        const students = studentsResult.rows;

        const enrolledClasses = await Promise.all(
            students.map(async (student) => {
                const classesResult = await db.query(
                    `
                SELECT classes.*
                FROM classes
                INNER JOIN enrollments ON classes.id = enrollments."classId"
                WHERE enrollments."studentId" = $1
                `, [student.id]
                );
                const classes = classesResult.rows;
                return { ...student, classes };
            })
        );

        res.status(200).send(enrolledClasses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os estudantes por turma');
    }
}


export async function getStudent(req, res) {
    try {
        const { studentId } = req.params;

        const studentResult = await db.query(
            `SELECT students.*, array_agg(enrollments."classId") as "classIds"
            FROM students
            LEFT JOIN enrollments ON students.id = enrollments."studentId"
            WHERE students.id = $1
            GROUP BY students.id;`,
            [studentId]
        );

        const student = studentResult.rows[0];
        if (!student) {
            return res.status(404).send('Estudante não encontrado');
        }

        res.status(200).send(student);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter informações do estudante');
    }
}

export async function showStudents(req, res) {
    try {
        const studentsResult = await db.query('SELECT * FROM students');
        const students = studentsResult.rows;

        res.status(200).send(students);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os estudantes');
    }
}

export async function studentsByClass(req, res) {
    try {
        const { classId } = req.params;

        const studentsResult = await db.query(
            `
            SELECT name
            FROM students
            WHERE "classId" = $1
            `,
            [classId]
        );

        const students = studentsResult.rows.map((row) => row.name);

        res.status(200).send(students);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao obter os estudantes por turma");
    }
}


