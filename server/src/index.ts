import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (_, res) => {
	res.send('Hello, TypeScript with Express hello!');
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
