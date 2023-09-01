import { axiosInstance, axiosPrivateInstance } from '@/utils/axios.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { watchEffect } from 'vue'
export const usePrivateApi = () => {
  const authStore = useAuthStore()

  watchEffect(() => {
    axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (
          (error?.response?.status === 403 || error?.response?.status === 401) &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true
          await authStore.refreshAction()

          prevRequest.headers['Authorization'] = authStore.accessToken
          return axiosInstance(prevRequest)
        }
        return Promise.reject(error)
      }
    )
  })
  return axiosPrivateInstance
}

export const useApi = () => {
  return axiosInstance
}
