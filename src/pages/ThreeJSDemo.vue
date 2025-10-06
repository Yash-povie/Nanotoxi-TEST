<template>
  <div class="min-h-screen py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Three.js Demo
        </h1>
        <p class="text-xl text-gray-300">
          Interactive 3D graphics powered by Three.js
        </p>
      </div>

      <div class="grid gap-8">
        <!-- Basic Example -->
        <div class="glass-card rounded-2xl p-8">
          <BasicThreeExample />
        </div>

        <!-- Custom Scene Area -->
        <div class="glass-card rounded-2xl p-8">
          <h3 class="text-xl font-bold text-white mb-4">Custom Three.js Scene</h3>
          <p class="text-gray-300 mb-4">
            Use this area to build your own 3D scenes. The Three.js setup is ready for you to add custom geometries, materials, and animations.
          </p>
          
          <ThreeJSContainer 
            ref="customContainer"
            width="100%" 
            height="400px"
          />
          
          <div class="mt-4">
            <button @click="addCustomContent" class="btn-primary mr-4">
              Add Custom Content
            </button>
            <button @click="resetCustomScene" class="btn-secondary">
              Reset Scene
            </button>
          </div>
        </div>

        <!-- Code Example -->
        <div class="glass-card rounded-2xl p-8">
          <h3 class="text-xl font-bold text-white mb-4">How to Use</h3>
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-green-400 text-sm"><code>// Import Three.js utilities
import { ThreeJSScene, createCube, createSphere } from '@/utils/threeSetup'
import * as THREE from 'three'

// Get the Three.js scene instance
const threeScene = threeContainer.value?.getThreeScene()

// Add objects to the scene
const cube = createCube(1, 0x00ff00)
threeScene.addToScene(cube)

// Start animation with custom callback
threeScene.startAnimation(() => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
})</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import ThreeJSContainer from '../components/ThreeJSContainer.vue'
import BasicThreeExample from '../components/examples/BasicThreeExample.vue'
import { createCube, createSphere } from '../utils/threeSetup'

const customContainer = ref()

const addCustomContent = () => {
  const threeScene = customContainer.value?.getThreeScene()
  if (!threeScene) return

  // Add a random colored rotating cube
  const cube = createCube(
    Math.random() * 2 + 0.5,
    Math.random() * 0xffffff
  )
  
  cube.position.set(
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 6
  )
  
  threeScene.addToScene(cube)
  
  // Start animation if not already running
  threeScene.startAnimation(() => {
    cube.rotation.x += 0.02
    cube.rotation.y += 0.01
    cube.rotation.z += 0.015
  })
}

const resetCustomScene = () => {
  const threeScene = customContainer.value?.getThreeScene()
  if (!threeScene) return

  // Clear the scene by removing all meshes
  const scene = threeScene.getScene()
  const objectsToRemove = scene.children.filter(child => child instanceof THREE.Mesh)
  
  objectsToRemove.forEach(obj => {
    threeScene.removeFromScene(obj)
  })
}
</script>