import { createHmac, createHash } from "node:crypto";
import { getCookie, type H3Event } from "h3";

export default async (event: H3Event): Promise<void> => {
	event.context.tgauth = event.context.tgauth ?? {};
	event.context.tgauth.valid = false;
	try {
		const authObjectString = getCookie(event, "TG_AUTH_USER");
		const { tgauth } = useRuntimeConfig();
		let token = undefined;
		if (tgauth) token = tgauth.token;
		if (!token) throw new Error("TG_BOT_TOKEN envirnoment variable is not set");
		if (authObjectString) {
			const authObject = JSON.parse(authObjectString);

			const hash = authObject.hash;

			// Generate validation string
			const objectKeys = Object.keys(authObject)
				.filter((v: string) => v !== "hash")
				.sort();
			const authString = objectKeys.map((key: string) => `${key}=${authObject[key]}`).join("\n");

			const SHA256 = (value: string) => {
				return createHash("sha256").update(value).digest();
			};

			const HMAC_SHA256 = (value: string, key: Buffer | string) => {
				return createHmac("sha256", key).update(value).digest();
			};

			const hex = (bytes: Buffer) => {
				return bytes.toString("hex");
			};

			// Generate secret key
			const secret_key = SHA256(token);

			// Generate hash to validate
			const hashGenerate = hex(HMAC_SHA256(authString, secret_key));

			// Calculate age of the hash
			const age = Math.floor(Date.now() / 1000) - authObject.auth_date;

			// Return bool value is valid

			const valid = Boolean(
				hashGenerate === hash
				&& (tgauth.auth_expiration === 0 || age < (tgauth.auth_expiration ?? 14 * 24 * 60 * 60)), // Invalidate after 14 days by default
			);
			event.context.tgauth.valid = valid;
		}
	} catch (error) {
		console.error("Error in telegram auth validation:", error);
	}
};
