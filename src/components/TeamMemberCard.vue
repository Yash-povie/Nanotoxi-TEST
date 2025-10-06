<template>
  <div class="glass-card rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300">
    <div class="mb-6">
      <div class="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-emerald-500/30 hover:border-emerald-400 transition-colors duration-300">
        <img 
          v-if="profileImage" 
          :src="profileImage" 
          :alt="`${name} profile picture`"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full bg-emerald-600/20 flex items-center justify-center">
          <UserIcon class="h-12 w-12 text-emerald-600" />
        </div>
      </div>
    </div>
    <a 
      v-if="linkedinUrl" 
      :href="linkedinUrl" 
      target="_blank" 
      rel="noopener noreferrer"
      class="inline-block hover:scale-105 transition-transform duration-200"
    >
      <h3 class="text-xl font-bold text-white mb-2 hover:text-emerald-300 transition-colors duration-200 cursor-pointer">
        {{ name }}
      </h3>
    </a>
    <h3 v-else class="text-xl font-bold text-white mb-2">{{ name }}</h3>
    <p class="text-emerald-400 font-medium mb-4">{{ role }}</p>
    <p class="text-emerald-100 text-sm leading-relaxed">{{ bio }}</p>
  </div>
</template>

<script setup lang="ts">
import UserIcon from './icons/UserIcon.vue'

interface Props {
  name: string
  role: string
  bio: string
  profileImage?: string
  linkedinUrl?: string
}

defineProps<Props>()
</script>