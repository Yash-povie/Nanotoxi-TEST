<template>
  <div class="space-y-2">
    <label :for="selectId" class="block text-sm font-medium text-emerald-100">
      {{ label }}
    </label>
    <select
      :id="selectId"
      :required="required"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="w-full px-4 py-3 border border-emerald-500/50 rounded-xl focus:ring-4 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 bg-emerald-900/40 text-white"
      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-300': error }"
      :aria-describedby="error ? `${selectId}-error` : undefined"
    >
      <option v-for="option in options" :key="option.value" :value="option.value" class="bg-emerald-900 text-white">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" :id="`${selectId}-error`" class="text-red-400 text-sm">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  value: string
  label: string
}

interface Props {
  modelValue: string
  label: string
  required?: boolean
  error?: string
  options: Option[]
}

const props = withDefaults(defineProps<Props>(), {
  required: false
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectId = computed(() => `select-${props.label.toLowerCase().replace(/\s+/g, '-')}`)
</script>