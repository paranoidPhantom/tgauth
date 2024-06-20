<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useCookie } from "nuxt/app";

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
		}
	} catch (err) {
		err;
	}
};

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
	}
	window.addEventListener("message", handleMessageEvent);
});

onUnmounted(() => {
	window.removeEventListener("message", handleMessageEvent);
});
</script>

<template>
	<div ref="root" class="tgauth">
		<ClientOnly>
			<template #fallback>
				<div
					style="background-color: #54a9eb; width: 218px; height: 2.5rem"
					:style="{
						borderRadius: borderRadius === undefined ? '20px' : `${borderRadius}px`,
					}"
				/>
			</template>
		</ClientOnly>
	</div>
</template>
