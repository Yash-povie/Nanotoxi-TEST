<template>
  <div>
    <!-- Hero Section with Three.js canvas (unchanged) -->
    <section id="hero" class="relative min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-gradient-to-br from-black via-emerald-900 to-gray-900">
      <!-- Left Content Column -->
      <div class="relative z-10 flex flex-col justify-center px-10 py-20 max-w-xl mx-auto text-left">
        <h1 class="text-6xl md:text-7xl font-light text-white mb-6 tracking-tight leading-tight">
          Predict Nanoparticle Toxicity
          <span class="block font-semibold bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
            Faster Than Ever
          </span>
        </h1>
        <p class="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed font-light">
          NanoToxi AI uses advanced machine learning to evaluate toxicity and cytotoxicity of metal oxide nanoparticles based on physicochemical descriptors.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-md">
          <router-link
            to="/predict"
            class="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl border border-emerald-500"
          >
            Predict Now
            <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </router-link>
          <button
            @click="scrollToSection('technology')"
            class="inline-flex items-center px-8 py-4 bg-transparent hover:bg-gray-800 text-gray-300 font-medium rounded-lg text-lg transition-all duration-200 border border-gray-700 hover:border-emerald-600"
          >
            Learn More
          </button>
        </div>
        <div class="mt-8">
          <button @click="toggleAnimation" class="text-gray-400 hover:text-white transition-colors text-sm">
          </button>
        </div>
      </div>
      <!-- Right 3D Canvas Column -->
      <div ref="threeContainer" class="relative w-full h-[90vh] md:h-full"></div>
    </section>

    <!-- Technology Section - animated cards -->
    <section id="technology" class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-900/40 via-black/60 to-gray-900/50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Our Technology</h2>
          <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            NanoToxi AI is powered by a multi-stage machine learning pipeline that integrates physicochemical data with advanced algorithms.
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div class="glass-card" data-aos="fade-right" data-aos-delay="0" data-aos-duration="650">
            <div class="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <ChartIcon class="h-8 w-8 text-emerald-400" />
            </div>
            <h3 class="text-lg font-bold text-white mb-3">Ensemble ML Models</h3>
            <p class="text-gray-300 text-sm">Boosting + Random Forest + Neural Networks for high accuracy</p>
          </div>
          <div class="glass-card" data-aos="fade-right" data-aos-delay="150" data-aos-duration="650">
            <div class="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <TargetIcon class="h-8 w-8 text-emerald-400" />
            </div>
            <h3 class="text-lg font-bold text-white mb-3">Physicochemical Descriptors</h3>
            <p class="text-gray-300 text-sm">Size, surface area, zeta potential, bandgap energy, and more</p>
          </div>
          <div class="glass-card" data-aos="fade-right" data-aos-delay="300" data-aos-duration="650">
            <div class="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <MoleculeIcon class="h-8 w-8 text-emerald-400" />
            </div>
            <h3 class="text-lg font-bold text-white mb-3">Dynamic Environment Simulation</h3>
            <p class="text-gray-300 text-sm">Accounts for aggregation, pH, and protein corona effects</p>
          </div>
          <div class="glass-card" data-aos="fade-right" data-aos-delay="450" data-aos-duration="650">
            <div class="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <ShieldIcon class="h-8 w-8 text-emerald-400" />
            </div>
            <h3 class="text-lg font-bold text-white mb-3">Real-Time Predictions</h3>
            <p class="text-gray-300 text-sm">Toxicity and cytotoxicity outcomes in seconds</p>
          </div>
        </div>
      </div>
    </section>

    <!-- History Section - animated cards -->
    <section id="history" class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black/70 via-emerald-900/30 to-gray-900/60">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Our Journey</h2>
          <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            The vision of NanoToxi AI began with the need to reduce reliance on slow, costly, and animal-dependent toxicology testing. Traditional methods can take 6–12 months and cost over $100,000 per material. By leveraging AI-driven predictive modeling, we aim to transform nanomaterial safety assessment into a fast, cost-effective, and ethical solution.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-10">
          <div class="glass-card" data-aos="fade-up" data-aos-delay="0" data-aos-duration="650">
            <div class="text-3xl font-bold text-emerald-400 mb-4">2023</div>
            <h3 class="text-xl font-bold text-white mb-4">Research Foundation</h3>
            <p class="text-gray-300">Research foundation on nanoparticle QSAR models</p>
          </div>
          <div class="glass-card" data-aos="fade-up" data-aos-delay="150" data-aos-duration="650">
            <div class="text-3xl font-bold text-emerald-400 mb-4">2024</div>
            <h3 class="text-xl font-bold text-white mb-4">Core Development</h3>
            <p class="text-gray-300">Development of core ensemble ML pipeline</p>
          </div>
          <div class="glass-card" data-aos="fade-up" data-aos-delay="300" data-aos-duration="650">
            <div class="text-3xl font-bold text-emerald-400 mb-4">2025</div>
            <h3 class="text-xl font-bold text-white mb-4">Platform Launch</h3>
            <p class="text-gray-300">Launch of NanoToxi AI predictive platform</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Are Doing Section - animated cards -->
    <section id="what-we-do" class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-900/50 via-black/40 to-gray-900/70">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">What We're Doing</h2>
          <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We are building the world's first calculation-only nanotoxicity prediction system, combining experimental datasets with computational models to:
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div data-aos="fade-left" data-aos-delay="0" data-aos-duration="650">
            <DoingCard
              icon="ShieldIcon"
              title="Support Regulators"
              desc="Providing reliable toxicity assessments for policy and safety standards"
              icon-color="green"
            />
          </div>
          <div data-aos="fade-left" data-aos-delay="150" data-aos-duration="650">
            <DoingCard
              icon="UserIcon"
              title="Help Researchers"
              desc="Accelerating nano-bio interaction studies with in silico predictions"
              icon-color="purple"
            />
          </div>
          <div data-aos="fade-left" data-aos-delay="300" data-aos-duration="650">
            <DoingCard
              icon="ChartIcon"
              title="Enable Industry"
              desc="Reducing cost and time in developing safe nanomaterials"
              icon-color="blue"
            />
          </div>
          <div data-aos="fade-left" data-aos-delay="450" data-aos-duration="650">
            <DoingCard
              icon="HeartIcon"
              title="Promote Ethics"
              desc="Minimizing dependence on animal testing"
              icon-color="red"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Predict CTA Section (less contrast, overlay) -->
    <section id="predict-cta" class="py-20 px-4 sm:px-6 lg:px-8" style="position:relative;">
      <div class="predict-overlay"></div>
      <div class="max-w-4xl mx-auto text-center predict-content">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Try Our Predictor</h2>
        <p class="text-xl text-emerald-100 mb-12 leading-relaxed">
          Enter nanoparticle descriptors (size, zeta potential, surface area, dosage, etc.) and instantly receive predictions about toxicity and cytotoxicity mechanisms.
        </p>
        <router-link
          to="/predict"
          class="inline-flex items-center px-12 py-4 bg-white hover:bg-gray-100 text-emerald-600 font-bold rounded-lg text-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Start Prediction
          <svg class="ml-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import AOS from 'aos'
import ChartIcon from '../components/icons/ChartIcon.vue'
import TargetIcon from '../components/icons/TargetIcon.vue'
import MoleculeIcon from '../components/icons/MoleculeIcon.vue'
import ShieldIcon from '../components/icons/ShieldIcon.vue'
import UserIcon from '../components/icons/UserIcon.vue'
import HeartIcon from '../components/icons/HeartIcon.vue'
import DoingCard from '../components/DoingCard.vue'

const threeContainer = ref<HTMLElement | null>(null)
const isPaused = ref(false)
let animationId: number
let wireObj: THREE.Mesh
let scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer

const toggleAnimation = () => {
  isPaused.value = !isPaused.value
}
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
onMounted(() => {
  if (!threeContainer.value) return
  scene = new THREE.Scene()
  const width = threeContainer.value.clientWidth
  const height = threeContainer.value.clientHeight
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
  camera.position.set(0, 0, 150)
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0)
  threeContainer.value.appendChild(renderer.domElement)
  scene.add(new THREE.AmbientLight(0x00ff99, 1.1))
  scene.add(new THREE.DirectionalLight(0x222222, 0.8))

  // Wireframe structure (like your image)
  const geometry = new THREE.IcosahedronGeometry(50, 3)
const material = new THREE.MeshBasicMaterial({
  color: 0x10ff88,
  wireframe: true,
  opacity: 0.6,
  transparent: true
})
wireObj = new THREE.Mesh(geometry, material)
scene.add(wireObj)


  window.addEventListener('resize', () => {
    if(!threeContainer.value) return
    const w = threeContainer.value.clientWidth
    const h = threeContainer.value.clientHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  })

  const animate = () => {
    if(!isPaused.value) {
  wireObj.rotation.x += 0.008
  wireObj.rotation.y += 0.014
}
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }
  animate()

  // Initialize AOS
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: false
  })
  onBeforeUnmount(() => {
    cancelAnimationFrame(animationId)
    renderer.dispose()
    scene.clear()
    if(threeContainer.value) threeContainer.value.removeChild(renderer.domElement)
  })
})
</script>

<style scoped>
#hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
}
@media(min-width: 768px) {
  #hero {
    grid-template-columns: 1fr 1fr;
  }
}
/* Glass Card Animation */
.glass-card {
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 18px 0 rgba(16, 185, 129, 0.24);
}
.glass-card:hover {
  transform: translateY(-13px) scale(1.07);
  box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.35), 0 0 40px 6px rgba(16, 185, 129, 0.25);
}
/* CTA Section Overlay - Less Contrast */
#predict-cta {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(16, 185, 129, 0.7) 50%, rgba(0, 0, 0, 0.8) 100%);
  position: relative;
}
.predict-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 0;
  border-radius: 1rem;
}
.predict-content {
  position: relative;
  z-index: 1;
}
</style>