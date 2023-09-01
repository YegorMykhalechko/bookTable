<template>
  <v-container fluid class="h-100 d-flex">
    <v-row align="center" justify="center">
      <v-col cols="10" md="8" lg="4">
        <v-card class="pa-5">
          <form @submit.prevent="submit">
            <v-text-field
              v-model="username.value.value"
              :error-messages="username.errorMessage.value"
              label="Nickname"
            ></v-text-field>

            <v-text-field
              v-model="firstName.value.value"
              :error-messages="firstName.errorMessage.value"
              label="First Name"
            ></v-text-field>

            <v-text-field
              v-model="lastName.value.value"
              :error-messages="lastName.errorMessage.value"
              label="Last Name"
            ></v-text-field>

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

            <v-text-field
              v-model="confirmPassword.value.value"
              :error-messages="confirmPassword.errorMessage.value"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              label="Confirm Password"
              @click:append-inner="visible = !visible"
            ></v-text-field>

            <v-btn class="me-4" type="submit">Register</v-btn>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useAuthStore, type RegisterData } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const errorMessage = ref('')

const visible = ref(false)
const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    username(value: any) {
      if (value) return true

      return 'Nickname is required'
    },

    first_name(value: any) {
      if (value) return true

      return 'First name is required'
    },

    last_name(value: any) {
      if (value) return true

      return 'Last name is required'
    },

    email(value: any) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    },

    password(value: any) {
      if (value) return true

      return 'Password is required'
    },

    password_confirms(value: any) {
      if (value && value === password.value.value) return true

      if (!value) return 'Confirm Password is requred'

      return 'Password do not match'
    }
  }
})
const username = useField('username')
const firstName = useField('first_name')
const lastName = useField('last_name')
const email = useField('email')
const password = useField('password')
const confirmPassword = useField('password_confirms')

const submit = handleSubmit(async (values: RegisterData) => {
  await authStore
    .registerAction(values)
    .then((res) => {
      router.push('/login')
    })
    .catch((error) => {
      errorMessage.value = error.message
      console.log(errorMessage.value)
    })
  handleReset()
})
</script>

<style scoped></style>
