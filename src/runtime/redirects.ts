import { useCookie, useRoute, defineNuxtPlugin, useState } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hook("app:beforeMount", () => {
		const { query } = useRoute();
		const extracting_keys = [
			"auth_date",
			"first_name",
			"last_name",
			"id",
			"hash",
			"photo_url",
			"username",
		];
		if (!extracting_keys.some((key: string) => query[key] === undefined)) {
			const result = JSON.stringify(query);
			const user = useCookie("TG_AUTH_USER");
			const global = useState("TG_AUTH_USER");
			user.value = result;
			global.value = result;
		}
	});
});
