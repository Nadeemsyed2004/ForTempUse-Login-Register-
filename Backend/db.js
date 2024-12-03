const sql = require('mysql2');

const connectDB = async () => {
    try {
        const connection = await sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Nadeem@2004',
            database: 'authentication',
        });
        console.log("Database connection successful!");
        return connection;
    } catch (err) {
        console.error("Database connection failed: ", err);
        throw err;
    }
};
module.exports = connectDB;
