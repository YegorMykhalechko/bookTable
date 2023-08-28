<script lang="ts">
export default defineComponent({
  name: 'TheAppLayout'
})
</script>

<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const layout = computed(() => {
  const layout = route?.meta?.layout

  

  if (layout) {
    return `The${layout}Layout`
  }
  return 'div'
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
