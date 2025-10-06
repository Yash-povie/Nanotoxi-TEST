<template>
  <div class="glass-card">
    <div class="text-center mb-4">
      <div class="text-3xl font-bold text-blue-400 mb-2">{{ year }}</div>
      <h3 class="text-xl font-bold text-white mb-3">{{ title }}</h3>
    </div>
    <p class="text-gray-300 leading-relaxed text-center">{{ desc }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  year: string
  title: string
  desc: string
}

defineProps<Props>()
</script>

<style scoped>
.glass-card {
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
}
</style>