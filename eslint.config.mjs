// @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
	features: {
		// Rules for module authors
		tooling: true,
		// Rules for formatting
		stylistic: {
			indent: "tab",
			quotes: "double",
			semi: true,
			braceStyle: "1tbs",
			commaDangle: `only-multiline`
		},
	},
	dirs: {
		src: [
			"./playground",
		],
	},
}).append(

);
