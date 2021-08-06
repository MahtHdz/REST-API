import pool from "../db/database";

export const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM public.user');
    console.log(response.rows);
    res.send('users');
}