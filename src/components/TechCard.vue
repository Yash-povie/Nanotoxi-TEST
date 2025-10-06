<template>
  <div class="glass-card">
    <div class="flex items-center mb-4">
      <component :is="iconComponent" class="w-8 h-8 text-blue-400 mr-3" />
      <h3 class="text-xl font-bold text-white">{{ title }}</h3>
    </div>
    <p class="text-gray-300 leading-relaxed">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ChartIcon from './icons/ChartIcon.vue'
import TargetIcon from './icons/TargetIcon.vue'
import MoleculeIcon from './icons/MoleculeIcon.vue'
import ShieldIcon from './icons/ShieldIcon.vue'

interface Props {
  icon: string
  title: string
  description: string
}

const props = defineProps<Props>()

const iconComponent = computed(() => {
  const iconMap: Record<string, any> = {
    ChartIcon,
    TargetIcon,
    MoleculeIcon,
    ShieldIcon
  }
  return iconMap[props.icon] || ChartIcon
})
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