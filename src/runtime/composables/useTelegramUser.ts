import { useCookie } from "nuxt/app";

export function useTelegramUser() {
	return useCookie("TG_AUTH_USER");
}
