import { serverTelegramUser } from "#tgauth/server";

export default defineEventHandler(async (event) => {
	const { valid, user } = await serverTelegramUser(event);
	if (valid && user) {
		console.log("Just validated user -", user.first_name, user.last_name);
	}
	return {
		valid,
	};
});
