interface TelegramUser {
	auth_date: string;
	first_name: string;
	last_name: string;
	id: string;
	hash: string;
	photo_url: string;
	username: string;
}

export type AuthData = Telegram | null;
