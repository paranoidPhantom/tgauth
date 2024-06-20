import {
	defineNuxtModule,
	createResolver,
	addComponent,
	addPlugin,
	addImports,
} from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: "tgauth",
		configKey: "tgauth",
	},
	defaults: {},
	setup(_options, _nuxt) {
		const resolver = createResolver(import.meta.url);
		addPlugin(resolver.resolve("runtime/redirects"));
		addImports({
			name: "useTelegramUser",
			from: resolver.resolve("runtime/composables/useTelegramUser"),
		});
		addComponent({
			name: "TelegramAuth",
			filePath: resolver.resolve("runtime/components/TelegramAuth.vue"),
		});
	},
});
