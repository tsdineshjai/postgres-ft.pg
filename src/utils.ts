import pg from "pg";
const { Client } = pg;

export async function getClient() {
	const client = new Client({
		host: "localhost",
		port: 5432,
		database: "catdb",
		user: "postgres",
		password: "7890",
	});

	await client.connect();
	return client;
}
