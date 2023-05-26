import { db } from "../database/database.connection.js";

export async function getClasses(req, res) {
    try {
        const getClassesResult = await db.query(`SELECT * FROM classes`);

        const classes = getClassesResult.rows.map((classe) => ({
            ...classe,
            startDate: classe.startDate.toISOString().split('T')[0],
            endDate: classe.endDate.toISOString().split('T')[0]
        }));

        res.status(200).send(classes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter informações das classes');
    }
};

export async function getClassesByStudent(req, res) {
    try {
        const { studentId } = req.params;

        const classesResult = await db.query(
            `
            SELECT classes.*
            FROM classes
            INNER JOIN enrollments ON classes.id = enrollments."classId"
            WHERE enrollments."studentId" = $1
            `,
            [studentId]
        );

        const classes = classesResult.rows;

        classes.forEach((classItem) => {
            classItem.startDate = classItem.startDate.toISOString().split('T')[0];
            classItem.endDate = classItem.endDate.toISOString().split('T')[0];
        });

        res.status(200).send(classes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter turmas do estudante');
    }
}
