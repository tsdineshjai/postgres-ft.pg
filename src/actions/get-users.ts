import { getClient } from "../utils";

async function getUser(emailData: string) {
	const client = await getClient();
	const userQuery = `SELECT * FROM users WHERE email = $1`;
	const user = await client.query(userQuery, [emailData]);
	return user;
}

getUser("catMicky@gmail.com")
	.then((user) => console.log(user.rows[0], `user fetching was successful`))
	.catch((e) => console.log(e));
