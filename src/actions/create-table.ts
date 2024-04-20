import { getClient } from "../utils";

async function createTable() {
	const client = await getClient();

	const createTableQuery = `CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`;
	const result = await client.query(createTableQuery);
	console.log(result);
}

createTable()
	.then(() => {
		console.log(`table was created successfully`);
	})
	.catch((e) => console.log(e));
