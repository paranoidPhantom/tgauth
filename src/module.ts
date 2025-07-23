import { defineNuxtModule, createResolver, addComponent, addPlugin, addImports } from "@nuxt/kit";
import { defu } from "defu";

export interface ModuleOptions {
	auth_expiration: number;
	token?: string;
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: "tgauth",
		configKey: "tgauth",
	},
	defaults: {
		auth_expiration: 60 * 60 * 24 * 14, // Auth expiration in seconds, default is 2 weeks, 0 means no expiration
	},
	setup(_options, _nuxt) {
		const resolver = createResolver(import.meta.url);
		const token
			= process.env.TG_BOT_TOKEN
			?? _options.token
			?? (_nuxt.options.runtimeConfig.tgauth as ModuleOptions).token;
		if (token) {
			_nuxt.options.runtimeConfig.tgauth = defu(
				_nuxt.options.runtimeConfig.tgauth as ModuleOptions,
				{
					token,
				},
			);
		}
		const expiration
			= _options.auth_expiration
			?? (_nuxt.options.runtimeConfig.tgauth as ModuleOptions).auth_expiration;
		if (expiration)
			_nuxt.options.runtimeConfig.tgauth = defu(
				_nuxt.options.runtimeConfig.tgauth as ModuleOptions,
				{
					auth_expiration: expiration,
				},
			);
		addPlugin(resolver.resolve("runtime/redirects"));
		addImports({
			name: "useTelegramUser",
			from: resolver.resolve("runtime/composables/useTelegramUser"),
		});
		addComponent({
			name: "TelegramAuth",
			filePath: resolver.resolve("runtime/components/TelegramAuth.vue"),
		});
		_nuxt.hook("nitro:config", async (nitroConfig) => {
			nitroConfig.alias = nitroConfig.alias || {};
			nitroConfig.alias["#tgauth/server"] = await resolver.resolvePath("runtime/server/services");
		});
	},
});
