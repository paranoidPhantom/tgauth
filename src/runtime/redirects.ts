import { useCookie, useRoute } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', () => {
    const { query } = useRoute()
    const extracting_keys = [
      'auth_date',
      'first_name',
      'last_name',
      'id',
      'hash',
      'photo_url',
      'username',
    ]
    if (!extracting_keys.some(key => query[key] === undefined)) {
      const user = useCookie('TG_AUTH_USER')
      user.value = JSON.stringify(query)
    }
  })
})
