<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useCookie, useState } from "nuxt/app";
import type { AuthData } from "./../types/authdata";

const props = withDefaults(
	defineProps<{
		size?: "small" | "medium" | "large";
		borderRadius?: number;
		requestMessagingAccess?: boolean;
		showUserPic?: boolean;
		bot: string;
		authUrl?: string;
	}>(),
	{
		size: "large",
		borderRadius: undefined,
		requestMessagingAccess: undefined,
		showUserPic: undefined,
	},
);

const emit = defineEmits<{
	login: [data: AuthData];
	logout: [];
}>();

const root = ref<HTMLDivElement>();

const handleMessageEvent = (event: MessageEvent) => {
	try {
		const data = JSON.parse(event.data);
		if (data.event === "auth_user") {
			const { auth_data: result } = data;
			const user = useCookie("TG_AUTH_USER");
			const global = useState("TG_AUTH_USER");
			user.value = result;
			global.value = result;
			emit("login", result);
		}
	} catch (err) {
		err;
	}
};

const globalUser = useState<AuthData>("TG_AUTH_USER");
watch(globalUser, (newValue: AuthData) => {
	if (!newValue) {
		emit("logout");
	}
});

const doubledUp = ref(false);

onMounted(() => {
	if (root.value) {
		const telegramWidget = document.createElement("script");
		telegramWidget.src = "https://telegram.org/js/telegram-widget.js?22";
		telegramWidget.async = true;
		telegramWidget.defer = true;

		telegramWidget.setAttribute("data-telegram-login", props.bot);
		telegramWidget.setAttribute("data-size", props.size);
		if (props.authUrl) {
			telegramWidget.setAttribute("data-auth-url", props.authUrl);
		}
		if (props.borderRadius !== undefined) {
			telegramWidget.setAttribute("data-radius", String(props.borderRadius));
		}
		if (props.requestMessagingAccess === false) {
			telegramWidget.setAttribute("data-request-access", String(props.requestMessagingAccess));
		}
		if (props.showUserPic === false) {
			telegramWidget.setAttribute("data-show-userpick", "false");
		}

		root.value.appendChild(telegramWidget);
		telegramWidget.addEventListener("load", () => {
			if (!telegramWidget.parentElement?.querySelector("iframe")) {
				doubledUp.value = true;
				console.warn(
					"tgauth:",
					"You have multiple login buttons for the same bot. Currently only one at a time is supported.",
				);
			}
		});
	}
	window.addEventListener("message", handleMessageEvent);
});

onUnmounted(() => {
	window.removeEventListener("message", handleMessageEvent);
});
</script>

<template>
	<div
		ref="root"
		class="tgauth"
	>
		<ClientOnly>
			<template #fallback>
				<div
					style="background-color: #54a9eb; width: 218px; height: 2.5rem"
					:style="{
						borderRadius: borderRadius === undefined ? '20px' : `${borderRadius}px`,
					}"
				/>
			</template>
			<div
				v-if="doubledUp"
				class="double-warning"
			>
				!
			</div>
		</ClientOnly>
	</div>
</template>

<style>
.double-warning {
	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;
	background-color: black;
	width: 2rem;
	height: 2rem;
	border-radius: 1rem;
	&::before {
		content: "You have multiple login buttons for the same bot. Currently only one at a time is supported.";
		position: absolute;
		top: 110%;
		left: 0;
		width: 20rem;
		padding: 0.5rem;
		border-radius: 0.5rem;
		background-color: black;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.5s;
		text-align: center;
	}
	&:hover::before {
		opacity: 1;
	}
}
</style>
