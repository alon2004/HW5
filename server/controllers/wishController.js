const db_connection = require('../db_connection');
const tbl_name = "tbl_10_wish";

const WishesController = {
    async getWishes(req, res) {
        const connection = await db_connection.createConnection();
        const [rows, fields] = await connection.execute(`SELECT * FROM ${tbl_name}`);
        res.json(rows);
    },
    async createWish(req, res) {
        const connection = await db_connection.createConnection();
        const [rows, fields] = await connection.execute(`INSERT INTO ${tbl_name} (name, wish) VALUES (?, ?)`, [req.body.name, req.body.wish]);
        res.json(rows);
    },
    async updateWish(req, res) {
        const connection = await db_connection.createConnection();
        const [rows, fields] = await connection.execute(`UPDATE ${tbl_name} SET name=? WHERE id=?`, [req.body.name, req.params.id]);
        res.json(rows);
    },
    async deleteWish(req, res) {
        const connection = await db_connection.createConnection();
        const [rows, fields] = await connection.execute(`DELETE FROM ${tbl_name} WHERE id=?`, [req.params.id]);
        res.json(rows);
    }
};

module.exports = WishesController;
