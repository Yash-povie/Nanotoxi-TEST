<template>
  <div class="space-y-2">
    <label :for="inputId" class="block text-sm font-medium text-emerald-100">
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :step="step"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full px-4 py-3 border border-emerald-500/50 rounded-xl focus:ring-4 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 bg-emerald-900/40 text-white placeholder-emerald-300/70"
      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-300': error }"
      :aria-describedby="error ? `${inputId}-error` : undefined"
    />
    <p v-if="error" :id="`${inputId}-error`" class="text-red-400 text-sm">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  step?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputId = computed(() => `input-${props.label.toLowerCase().replace(/\s+/g, '-')}`)
</script>