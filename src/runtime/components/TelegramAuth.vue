<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        size?: "small" | "medium" | "large";
        borderRadius?: number;
        requestMessagingAccess?: boolean;
        showUserPic?: boolean;
        bot: string;
        auth_url?: string;
    }>(),
    {
        size: "large",
        borderRadius: undefined,
        requestMessagingAccess: undefined,
        showUserPic: undefined,
    }
);
const root = ref<HTMLDiivElement>();

const handleMessageEvent = (event: MessageEvent) => {
    try {
        const data = JSON.parse(event.data);
        if (data.event === "auth_user") {
            const { auth_data } = data;
            const user = useCookie("TG_AUTH_USER");
            user.value = JSON.stringify(auth_data);
        }
    } catch {}
};

onMounted(() => {
    if (root.value) {
        const telegramWidget = document.createElement("script");
        telegramWidget.src = "https://telegram.org/js/telegram-widget.js?22";
        telegramWidget.async = true;
        telegramWidget.defer = true;

        telegramWidget.setAttribute("data-telegram-login", props.bot);
        telegramWidget.setAttribute("data-size", props.size);
        if (props.auth_url) {
            telegramWidget.setAttribute("data-auth-url", props.auth_url);
        }
        if (props.borderRadius !== undefined) {
            telegramWidget.setAttribute("data-radius", props.borderRadius);
        }
        if (props.requestMessagingAccess === false) {
            telegramWidget.setAttribute(
                "data-request-access",
                props.requestMessagingAccess
            );
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
    <div class="tgauth" ref="root">
        <ClientOnly>
            <template #fallback>
                <div
                    style="
                        background-color: #54a9eb;
                        width: 218px;
                        height: 2.5rem;
                    "
                    :style="{
                        borderRadius:
                            borderRadius === undefined
                                ? '20px'
                                : `${borderRadius}px`,
                    }"
                ></div>
            </template>
        </ClientOnly>
    </div>
</template>