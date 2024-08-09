const db_connection = require('../db_connection');
const tbl_name = "tbl_10_wish";

const WishesController = {
    async getWishes(req, res) {
        try {
            const connection = await db_connection.createConnection();
            const [rows, fields] = await connection.execute(`SELECT * FROM ${tbl_name}`);
            res.json(rows);
            connection.end();
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: 'An error occurred while fetching wishes', error });
        }
    },

    async getWishesbyid(req, res) {
        try {
            const connection = await db_connection.createConnection();
            const [rows, fields] = await connection.execute(`SELECT * FROM ${tbl_name} WHERE id=?`, [req.params.id]);
            res.json(rows);
            connection.end();
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: 'An error occurred while fetching the wish', error });
        }
    },

    async createWish(req, res) {
        try {
            const connection = await db_connection.createConnection();
            const [rows, fields] = await connection.execute(`INSERT INTO ${tbl_name} (name, wish) VALUES (?, ?)`, [req.body.name, req.body.wish]);
            res.json({ message: 'Wish created successfully', wishId: rows.insertId });
            connection.end();
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: 'An error occurred while creating the wish', error });
        }
    },

    async updateWish(req, res) {
        try {
            const connection = await db_connection.createConnection();
            const [rows, fields] = await connection.execute(`UPDATE ${tbl_name} SET name=? ,wish=? WHERE id=?`, [req.body.name, req.body.wish, req.params.id]);
            res.json({ message: 'Wish updated successfully' });
            connection.end();
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: 'An error occurred while updating the wish', error });
        }
    },

    async deleteWish(req, res) {
        try {
            const connection = await db_connection.createConnection();
            const [rows, fields] = await connection.execute(`DELETE FROM ${tbl_name} WHERE id=?`, [req.params.id]);
            res.json({ message: 'Wish deleted successfully' });
            connection.end();
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: 'An error occurred while deleting the wish', error });
        }
    }
};

module.exports = WishesController;
