<script lang="ts" setup>
import type { TelegramUser } from "../../src/module";

const { user, logout } = useTelegramUser();
const toast = useToast();

const authenticated = (data: TelegramUser) => {
	toast.add({
		title: `Authenticated as ${data.first_name} ${data.last_name}!`,
		description: `a.k.a. @${data.username}`,
		avatar: {
			src: data.photo_url,
			alt: `${data.first_name} ${data.last_name}`,
		},
	});
};

const userDataCookie = useCookie("TG_AUTH_USER");

const userData = ref(JSON.stringify(user.value, null, 2));

watch(userData, (newData) => {
	userDataCookie.value = newData;
});

const { data } = await useFetch("/api/validate", {
	method: "POST",
	watch: [userDataCookie],
});
</script>

<template>
	<div class="__demo p-8">
		<UCard>
			<div class="flex flex-col gap-4">
				<TelegramAuth
					bot="localhost_756382_bot"
					@login="authenticated"
					@logout="toast.add({ title: 'Logged out!' })"
				/>
				<MonacoEditor
					v-model="userData"
					class="h-96"
					:options="{ theme: 'vs-dark' }"
					lang="json"
				/>
				<UAlert
					v-if="data?.valid"
					color="green"
					variant="subtle"
					title="Data is from telegram (valid)"
				/>
				<UAlert
					v-else
					color="red"
					variant="subtle"
					title="Data is not from telegram (invalid)"
				/>
				<UButton
					class="w-fit"
					@click="logout"
				>
					Logout
				</UButton>
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
