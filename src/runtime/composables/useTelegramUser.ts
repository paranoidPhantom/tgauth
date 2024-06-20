import { useCookie, useState } from "nuxt/app";
import type { AuthData } from "../types/authdata";

export function useTelegramUser() {
	return {
		user: useState<AuthData>("TG_AUTH_USER", () => useCookie("TG_AUTH_USER")),
		logout: () => {
			useCookie("TG_AUTH_USER").value = null;
			useState("TG_AUTH_USER").value = null;
		},
	};
}
