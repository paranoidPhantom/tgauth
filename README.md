<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: tgauth
- Package name: @paranoidphantom/tgauth
- Description: A simple solution to add telegram login button to your Nuxt app
-->

# tgauth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

> 😊 This is my first module so I'm sure there are some things that can be improved.

A simple solution to add telegram login button to your Nuxt app

## Features

- 🚀 **Provides a simple component for the login button**
- 💾 **Persists user data and provides a simple composable for accessing it**

## Quick Setup

1. Install the module

```bash
npx nuxi module add @paranoidphantom/tgauth
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
const { user } = useTelegramUser();

console.log(user.value); // => { first_name: "John", last_name: "Doe", username: "johndoe", ...}
</script>
```

## Logout

```vue
<script lang="ts" setup>
const { logout } = useTelegramUser();

logout(); // => clears stored telegram user data
</script>
```

## Listen for events

```vue
<template>
	<TelegramAuth @login="(data) => console.log(data)" @logout="() => console.log('Logged out!')" bot="<bot username>" />
</templaet>
```

## Use redirect mode

> If the user is redirected to your nuxt app, useTelegramUser will be automatically populated with the returned data.

```vue
<template>
	<TelegramAuth bot="<bot username>" auth-url="https://your-app.com/callback" />
</templaet>
```

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

[npm-version-src]: https://img.shields.io/npm/v/@paranoidphantom/tgauth/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@paranoidphantom/tgauth
[npm-downloads-src]: https://img.shields.io/npm/dm/@paranoidphantom/tgauth.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@paranoidphantom/tgauth
[license-src]: https://img.shields.io/npm/l/@paranoidphantom/tgauth.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@paranoidphantom/tgauth
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
