import { db } from "../database/database.connection.js";

export const createStudent = async (req, res) => {
    try {
        const { name, photo, cpf, email } = req.body;

        const result = await db.query(
            `INSERT INTO students 
            (name, photo, cpf, email) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;`,
            [name, photo, cpf, email]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar novo aluno' });
    }
};
