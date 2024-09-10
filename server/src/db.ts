import type { IConnectionParameters } from 'pg-promise/typescript/pg-subset.js';

import dotenv from 'dotenv';
import pgPromise from 'pg-promise';

dotenv.config();

const connection: IConnectionParameters = {
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	max: 10,
};

const pgpromise = pgPromise();
const db = pgpromise(connection);

export { db };
