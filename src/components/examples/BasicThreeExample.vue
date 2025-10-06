<template>
  <div class="basic-three-example">
    <h3 class="text-xl font-bold text-white mb-4">Basic Three.js Example</h3>
    
    <ThreeJSContainer 
      ref="threeContainer"
      width="100%" 
      height="300px"
      :auto-start="false"
    />
    
    <div class="controls mt-4 space-x-4">
      <button @click="startAnimation" class="btn-primary">Start</button>
      <button @click="stopAnimation" class="btn-secondary">Stop</button>
      <button @click="addCube" class="btn-secondary">Add Cube</button>
      <button @click="addSphere" class="btn-secondary">Add Sphere</button>
      <button @click="clearScene" class="btn-secondary">Clear</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import ThreeJSContainer from '../ThreeJSContainer.vue'
import { createCube, createSphere, createTorus } from '../../utils/threeSetup'

const threeContainer = ref()
const objects: THREE.Mesh[] = []

let animationCallback: (() => void) | null = null

onMounted(() => {
  setupScene()
})

const setupScene = () => {
  const threeScene = threeContainer.value?.getThreeScene()
  if (!threeScene) return

  // Add some basic lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
  threeScene.addToScene(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(1, 1, 1)
  threeScene.addToScene(directionalLight)

  // Add initial objects
  const cube = createCube(1, 0x00ff88)
  cube.position.x = -2
  threeScene.addToScene(cube)
  objects.push(cube)

  const sphere = createSphere(0.8, 0x0088ff)
  sphere.position.x = 0
  threeScene.addToScene(sphere)
  objects.push(sphere)

  const torus = createTorus(0.8, 0.3, 0xff8800)
  torus.position.x = 2
  threeScene.addToScene(torus)
  objects.push(torus)

  // Set up animation callback
  animationCallback = () => {
    objects.forEach((obj, index) => {
      obj.rotation.x += 0.01 * (index + 1)
      obj.rotation.y += 0.01 * (index + 1)
    })
  }
}

const startAnimation = () => {
  const threeScene = threeContainer.value?.getThreeScene()
  if (threeScene && animationCallback) {
    threeScene.startAnimation(animationCallback)
  }
}

const stopAnimation = () => {
  const threeScene = threeContainer.value?.getThreeScene()
  if (threeScene) {
    threeScene.stopAnimation()
  }
}

const addCube = () => {
  const threeScene = threeContainer.value?.getThreeScene()
  if (!threeScene) return

  const cube = createCube(
    Math.random() * 0.5 + 0.5,
    Math.random() * 0xffffff
  )
  cube.position.set(
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4
  )
  
  threeScene.addToScene(cube)
  objects.push(cube)
}

const addSphere = () => {
  const threeScene = threeContainer.value?.getThreeScene()
  if (!threeScene) return

  const sphere = createSphere(
    Math.random() * 0.5 + 0.3,
    Math.random() * 0xffffff
  )
  sphere.position.set(
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4
  )
  
  threeScene.addToScene(sphere)
  objects.push(sphere)
}

const clearScene = () => {
  const threeScene = threeContainer.value?.getThreeScene()
  if (!threeScene) return

  objects.forEach(obj => {
    threeScene.removeFromScene(obj)
  })
  objects.length = 0
}
</script>