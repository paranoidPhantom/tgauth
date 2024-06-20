import { useCookie, useState } from "nuxt/app";

export function useTelegramUser() {
	return useState("TG_AUTH_USER", () => useCookie("TG_AUTH_USER"));
}
