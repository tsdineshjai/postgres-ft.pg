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

	const createAddressQuery = `CREATE TABLE address (

		id SERIAL PRIMARY KEY,
		user_id INTEGER NOT NULL,
		city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE	)`;

	const address = await client.query(createAddressQuery);
	console.log(address);
}

createTable()
	.then(() => {
		console.log(`table and address were created successfully`);
	})
	.catch((e) => console.log(e));
