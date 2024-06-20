<script lang="ts" setup>
const tguser = useTelegramUser();
</script>

<template>
	<div class="__demo">
		<TelegramAuth bot="tbc_1_bot" />
		<pre v-if="tguser">{{ tguser }}</pre>
	</div>
</template>

<style>
:root {
	color-scheme: dark;
	.__demo {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}
}
</style>
