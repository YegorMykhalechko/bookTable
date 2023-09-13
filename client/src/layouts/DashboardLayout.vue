<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheDashboardLayout'
})
</script>

<script setup lang="ts">
import DashboardNavbar from '@/components/DashboardNavbar.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
  await authStore
    .logoutAction()
    .then((res) => {
      router.replace({ name: 'home' })
    })
    .catch((err) => {
      console.log(err.message)
    })
}
</script>

<template>
  <VLayout>
    <DashboardNavbar />
    <VNavigationDrawer color="grey-darken-2" permanent></VNavigationDrawer>
    <VMain>
      <slot></slot>
    </VMain>
  </VLayout>
</template>
