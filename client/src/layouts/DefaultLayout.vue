<script lang="ts">
import { defineComponent } from 'vue'
import DefaultNavbar from '@/components/DefaultNavbar.vue'

export default defineComponent({
  name: 'TheDefaultLayout',
  components: { DefaultNavbar }
})
</script>

<template>
  <VLayout>
    <DefaultNavbar />
    <VMain>
      <slot></slot>
    </VMain>
  </VLayout>
</template>
