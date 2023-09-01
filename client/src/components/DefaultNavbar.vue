<template>
  <v-app-bar color="primary" prominent>
    <v-btn icon @click="goHome">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-toolbar-title>App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn class="pa-3" to="/login">Login</v-btn>

    <v-btn class="pa-3" to="/register">Register</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.logo {
  cursor: pointer;
}
</style>
