<script lang="ts" setup>
import { UAccordion } from "#components";

const tguser = useTelegramUser();

const list = [
	{
		label: "User data",
		slot: "data",
	},
];
</script>

<template>
	<div class="__demo p-8 flex flex-col items-center gap-8">
		<TelegramAuth bot="tbc_1_bot" />
		<UAccordion :items="list">
			<template #data>
				<pre v-if="tguser">{{ tguser }}</pre>
			</template>
		</UAccordion>
	</div>
</template>

<script setup></script>
