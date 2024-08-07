export default defineEventHandler(async (event) => {
	const { valid, user } = event.context.tgauth;
	if (valid) {
		console.log("Just validated user -", user.first_name, user.last_name);
	}
	return {
		valid,
	};
});
