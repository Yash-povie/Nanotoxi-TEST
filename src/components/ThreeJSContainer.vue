<template>
  <div ref="containerRef" class="threejs-container" :style="{ width, height }">
    <!-- Three.js canvas will be inserted here -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { ThreeJSScene } from '../utils/threeSetup'

interface Props {
  width?: string
  height?: string
  autoStart?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '400px',
  autoStart: true
})

const containerRef = ref<HTMLElement>()
let threeScene: ThreeJSScene | null = null

// Expose the Three.js scene instance to parent components
const getThreeScene = () => threeScene

// Initialize Three.js scene
const initThreeJS = () => {
  if (!containerRef.value) return
  
  threeScene = new ThreeJSScene(containerRef.value)
  
  if (props.autoStart) {
    threeScene.startAnimation()
  }
}

// Clean up Three.js resources
const cleanup = () => {
  if (threeScene) {
    threeScene.dispose()
    threeScene = null
  }
}

onMounted(() => {
  initThreeJS()
})

onUnmounted(() => {
  cleanup()
})

// Watch for size changes and reinitialize if needed
watch([() => props.width, () => props.height], () => {
  cleanup()
  // Small delay to ensure DOM updates
  setTimeout(initThreeJS, 10)
})

// Expose methods to parent component
defineExpose({
  getThreeScene,
  cleanup,
  reinitialize: () => {
    cleanup()
    setTimeout(initThreeJS, 10)
  }
})
</script>

<style scoped>
.threejs-container {
  position: relative;
  overflow: hidden;
}

.threejs-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>