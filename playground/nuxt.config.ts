export default defineNuxtConfig({
    modules: ["../src/module", "@nuxt/ui"],
    tgauth: {},
    devServer: {
        port: 80,
        host: "0.0.0.0",
    },
    devtools: { enabled: true },
});