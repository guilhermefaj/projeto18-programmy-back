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
            SELECT *
            FROM projects
            WHERE "classId" = $1
            `,
            [classId]
        );

        res.status(200).send(projectsResult.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os projetos');
    }
}

export async function showProject(req, res) {
    const { id } = req.params;

    try {
        const projectResult = await db.query(
            'SELECT * FROM projects WHERE id = $1',
            [id]
        );

        const project = projectResult.rows[0];

        if (!project) {
            return res.status(404).send('Projeto não encontrado');
        }

        res.status(200).send(project);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter o projeto');
    }
}

export async function getGradesByProject(req, res) {
    try {
        const { projectId } = req.params;

        console.log("projectId:", projectId)

        const gradesResult = await db.query(
            `
            SELECT students.name, grade."grades"
            FROM students
            INNER JOIN submissions ON students.id = submissions."studentId"
            INNER JOIN grade ON submissions."gradeId" = grade.id
            WHERE submissions."projectId" = $1
            `, [projectId]
        );
        const grades = gradesResult.rows;

        res.status(200).send(grades);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter as notas do projeto');
    }
}


