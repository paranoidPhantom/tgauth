<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: tgauth
- Package name: @nuxtjs/tgauth
- Description: A simple solution to add telegram auth button to your Nuxt app
-->

# tgauth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A simple solution to add telegram auth button to your Nuxt app

## Features

-   🚀 Provides a simple component for the login button
-   🔒 Adds a server service to validate user data
-   💾 Persists user data and provides a simple composable for accessing it

## Quick Setup

1. Install the module

```bash
npx nuxi module add @nuxtjs/tgauth
```

2. Add the `TelegramAuth` component

```vue
<template>
	<TelegramAuth bot="<bot username>" />
</templaet>
```

3. Get user info using the `useTelegramUser` composable

```vue
<script lang="ts" setup>
const user = useTelegramUser();
</script>
```

That's it! You can now use telegram for user authentication in your app ✨

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  bun install
  
  # Generate type stubs
  bun run dev:prepare
  
  # Develop with the playground
  bun run dev
  
  # Build the playground
  bun run dev:build
  
  # Run ESLint
  bun run lint
  
  # Run Vitest
  bun run test
  bun run test:watch
  
  # Release new version
  bun run release
  ```

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/tgauth/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@nuxtjs/tgauth
[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/tgauth.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/tgauth
[license-src]: https://img.shields.io/npm/l/@nuxtjs/tgauth.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@nuxtjs/tgauth
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
