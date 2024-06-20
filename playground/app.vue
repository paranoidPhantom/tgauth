<script lang="ts" setup>
import type { AuthData } from "../src/runtime/types/authdata";

const { user, logout } = useTelegramUser();
const toast = useToast();

const authenticated = (data: AuthData) => {
	toast.add({
		title: `Authenticated as ${data.first_name} ${data.last_name}!`,
		description: `a.k.a. @${data.username}`,
		avatar: {
			src: data.photo_url,
			alt: `${data.first_name} ${data.last_name}`,
		},
	});
};
</script>

<template>
	<div class="__demo p-8">
		<UCard>
			<div class="flex flex-col gap-4">
				<TelegramAuth
					@login="authenticated"
					@logout="toast.add({ title: 'Logged out!' })"
					bot="tbc_1_bot"
				/>
				<Shiki
					class="overflow-x-auto"
					v-if="user"
					lang="json"
					:code="JSON.stringify(user, null, 2)"
				/>
				<UButton @click="logout" class="w-fit">Logout</UButton>
			</div>
		</UCard>
		<UNotifications />
	</div>
</template>

<style>
:root {
	color-scheme: dark;
	span {
		background-color: rgba(0, 0, 0, 0);
	}
}
</style>
