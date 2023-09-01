import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePrivateApi, useApi } from '@/composables/useApi.ts'

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
}

export interface RegisterData {
  username: string
  email: string
  first_name: string
  last_name: string
  password: string
  confirm_password: string
}

export interface LoginData {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>(null)
  const accessToken = ref<string>('')
  const isAuth = computed(() => (user.value?.id ? true : false))

  const loginAction = async (payload: LoginData) => {
    try {
      const { data } = await useApi().post(`api/auth/login`, payload)
      accessToken.value = data?.access_token
      await getUserAction()
      return data
    } catch (error: Error | any) {
      throw error.response.message
    }
  }

  const registerAction = async (payload: RegisterData) => {
    try {
      const { data } = await useApi().post(`api/auth/register`, payload)
      user.value = data
      return data
    } catch (error: Error | any) {
      throw error.response.message
    }
  }

  const logoutAction = async () => {
    try {
      const { data } = await usePrivateApi().post(`api/auth/logout`)
      accessToken.value = ''
      user.value = null
      return data
    } catch (error: Error | any) {
      throw error.response.message
    }
  }

  const getUserAction = async () => {
    try {
      const { data } = await usePrivateApi().get(`api/auth/user`)
      user.value = data
      return data
    } catch (error: Error | any) {
      throw error.response.message
    }
  }

  const refreshAction = async () => {
    try {
      const { data } = await useApi().post(`api/auth/refresh`)
      accessToken.value = data?.access_token
      return data
    } catch (error: Error | any) {
      throw error.response.message
    }
  }

  const attemptAction = async () => {
    try {
      await refreshAction()
      await getUserAction()
    } catch (error) {
      return
    }
    return
  }

  return {
    user,
    accessToken,
    isAuth,
    loginAction,
    registerAction,
    logoutAction,
    getUserAction,
    refreshAction,
    attemptAction
  }
})
