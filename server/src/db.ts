import dotenv from 'dotenv';
import pgPromise from 'pg-promise';

dotenv.config();

const connection = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	max: 10,
};

const pgpromise = pgPromise();
const db = pgpromise(connection);

export { db };
