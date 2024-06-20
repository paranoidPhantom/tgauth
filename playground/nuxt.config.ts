export default defineNuxtConfig({
	modules: ["../src/module"],
	tgauth: {},
	devServer: {
		port: 80,
		host: "0.0.0.0",
	},
	devtools: { enabled: true },
});
