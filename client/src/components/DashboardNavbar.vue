<template>
  <v-app-bar color="primary" prominent>
    <v-spacer></v-spacer>

    <v-menu min-width="200px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar color="brown" size="large">
            <span class="text-h5">{{ user.initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar color="brown">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
            <h3>{{ user.fullName }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text"> Edit Account </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text" @click="logout"> logout </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const user = {
  initials: 'JD',
  fullName: 'John Doe',
  email: 'john.doe@doe.com'
}

const logout = async () => {
  await authStore
    .logoutAction()
    .then(() => {
      router.replace({ name: 'home' })
    })
    .catch((err) => {
      console.log(err.message)
    })
}
</script>

<style scoped>
.logo {
  cursor: pointer;
}
</style>
