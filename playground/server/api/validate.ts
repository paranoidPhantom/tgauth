export default defineEventHandler(async (event) => {
	const { valid } = event.context.tgauth;
	return {
		valid,
	};
});
