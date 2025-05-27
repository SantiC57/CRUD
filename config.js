const port = process.env.PORT || 5000;

// Para Railway - usar las variables que Railway genera automáticamente
const DB_HOST = process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost';
const DB_USER = process.env.MYSQL_USER || process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || 'admin123';
const DB_NAME = process.env.MYSQL_DATABASE || process.env.DB_NAME || 'Recetas';
const DB_PORT = process.env.MYSQL_PORT || process.env.DB_PORT || 3306;

// También Railway a veces usa DATABASE_URL
const DATABASE_URL = process.env.DATABASE_URL || process.env.MYSQL_URL;

module.exports = {
    port,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    DATABASE_URL
};