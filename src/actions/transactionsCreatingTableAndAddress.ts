/* highly important : transactions helps us to either do all the required changes or if anyone fails just abort and 
rollback the changes. 
*/
//Transactions

import { Client } from "pg";

async function insertUserRecordAndAddressRecord(
	email: string,
	password: string,
	city: string,
	country: string
) {
	const client = new Client({
		host: "localhost",
		port: 5432,
		database: "catdb",
		user: "postgres",
		password: "7890",
	});

	try {
		await client.connect();

		//start transaction
		await client.query("BEGIN");

		//add a record to the user Table
		const insertUserQuery = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id;
    `;

		const userRes = await client.query(insertUserQuery, [email, password]);
		console.log(userRes);
		const userId = userRes.rows[0].id;

		//add a record to the address table using the retunred User ID
		const inserAddressQuery = `INSERT INTO address (user_id, city, country) 
    VALUES ($1, $2, $3);
    `;

		await client.query(inserAddressQuery, [userId, city, country]);

		//now commit the transaction only if addtions of the records in the users and address table are succesrful

		await client.query("COMMIT");
	} catch (err) {
		//any error happens rollback all the changes
		await client.query("ROLLBACK");
		console.error("Error during transaction, rolled back.", err);

		throw err;
	} finally {
		//end the connection; closes the client.
		await client.end();
	}
}

insertUserRecordAndAddressRecord(
	"fattyfurryCat@cat.com",
	"catknowseverythingAndYoknow",
	"kilambakakam",
	"tamilnadu-india"
);
