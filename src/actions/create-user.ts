import { getClient } from "../utils";

async function createUser() {
	const client = await getClient();

	const createUserQuery = `
   INSERT INTO users (email, password ) VALUES ($1, $2)`;
	const valuesArray = ["milywhiteCattyBiggy@gmail.com", "rosyCat"];
	const user = await client.query(createUserQuery, valuesArray);
	console.log(user);
}

createUser()
	.then(() => console.log(`user was created successfully`))
	.catch((e) => console.log(e));
