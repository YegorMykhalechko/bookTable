<template>
  <div v-if="user">{{ user }}</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { computed } from 'vue'

const authStore = useAuthStore()

const user = computed(() => {
  return authStore.user
})

onMounted(async () => {
  await authStore.getUserAction()
})
</script>

<style scoped></style>
