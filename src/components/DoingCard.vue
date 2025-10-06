<template>
  <div class="glass-card">
    <div class="flex items-center mb-4">
      <component :is="iconComponent" :class="iconColorClass" class="w-8 h-8 mr-3" />
      <h3 class="text-xl font-bold text-white">{{ title }}</h3>
    </div>
    <p class="text-gray-300 leading-relaxed">{{ desc }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ChartIcon from './icons/ChartIcon.vue'
import UserIcon from './icons/UserIcon.vue'
import ShieldIcon from './icons/ShieldIcon.vue'
import HeartIcon from './icons/HeartIcon.vue'

interface Props {
  icon: string
  title: string
  desc: string
  iconColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: 'blue'
})

const iconComponent = computed(() => {
  const iconMap: Record<string, any> = {
    ChartIcon,
    UserIcon,
    ShieldIcon,
    HeartIcon
  }
  return iconMap[props.icon] || ChartIcon
})

const iconColorClass = computed(() => {
  const colorMap: Record<string, string> = {
    green: 'text-green-400',
    purple: 'text-purple-400',
    blue: 'text-blue-400',
    red: 'text-red-400'
  }
  return colorMap[props.iconColor] || 'text-blue-400'
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