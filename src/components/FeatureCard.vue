<template>
  <div class="glass-card rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 group">
    <div class="mb-6 group-hover:scale-110 transition-transform duration-300">
      <slot name="icon" />
    </div>
    <h3 class="text-xl font-bold text-gray-900 mb-4">{{ title }}</h3>
    <p class="text-gray-600 leading-relaxed">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
}

defineProps<Props>()
</script>