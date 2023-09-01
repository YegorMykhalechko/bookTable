import { useAuthStore } from '@/stores/auth'

export const authentication = {
  async install() {
    const store = useAuthStore()
    try {
      await store.attemptAction()
      return
    } catch (error) {
      return
    }
  }
}
