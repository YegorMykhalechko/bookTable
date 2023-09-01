<template>
  <v-container fluid class="h-100 d-flex">
    <v-row align="center" justify="center">
      <v-col cols="10" md="8" lg="4">
        <v-card class="pa-5">
          <form @submit.prevent="submit">
            <v-text-field
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              label="E-mail"
            ></v-text-field>

            <v-text-field
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              label="Password"
              @click:append-inner="visible = !visible"
            ></v-text-field>

            <v-btn class="me-4" type="submit">Login</v-btn>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useAuthStore, type LoginData } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const errorMessage = ref('')

const visible = ref(false)
const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    email(value: any) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    },
    password(value: any) {
      if (value) return true

      return 'Password is required'
    }
  }
})
const email = useField('email')
const password = useField('password')

const submit = handleSubmit(async (values: LoginData) => {
  await authStore
    .loginAction(values)
    .then((res) => {
      router.replace({ name: 'user' })
    })
    .catch((error) => {
      errorMessage.value = error.message
      console.log(errorMessage.value)
    })
  handleReset()
})
</script>

<style scoped></style>
