export default defineNuxtConfig({
	modules: ["../src/module", "@nuxt/ui", "nuxt-shiki"],
	shiki: {
		bundledThemes: ["github-dark-default"],
		defaultTheme: "github-dark-default",
	},
	tgauth: {},
	devServer: {
		port: 80,
		host: "0.0.0.0",
	},
	devtools: { enabled: true },
});
