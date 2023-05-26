import { db } from '../database/database.connection.js';

export async function createProject(req, res) {
    try {
        const { classId, studentName, projectName, projectLink } = req.body;

        const result = await db.query(
            `
      INSERT INTO projects ("classId", "studentName", "projectName", "projectLink")
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `, [classId, studentName, projectName, projectLink]
        );

        const project = result.rows[0];

        res.status(201).send(project);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar projeto');
    }
}

export async function showProjects(req, res) {
    try {
        const projectsResult = await db.query('SELECT * FROM projects');
        const projects = projectsResult.rows;

        res.status(200).send(projects);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os projetos');
    }
}

export async function showProjectsByClassId(req, res) {
    try {
        const { classId } = req.params;

        const projectsResult = await db.query(
            `
            SELECT "projectName"
            FROM projects
            WHERE "classId" = $1
            `,
            [classId]
        );

        const projects = projectsResult.rows.map((row) => row.projectName);

        res.status(200).send(projects);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os projetos');
    }
}

