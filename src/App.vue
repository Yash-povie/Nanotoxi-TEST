<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-emerald-900 to-gray-900">
    <!-- Navigation -->
    <nav class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-black via-emerald-900/80 to-gray-900/90 border border-emerald-700/30 rounded-2xl px-8 py-3 z-50 shadow-lg w-[90%] max-w-5xl backdrop-blur-md">
      <div class="mx-auto">
        <div class="flex justify-between items-center h-12">
          <router-link to="/" class="flex items-center space-x-2">
            <MoleculeIcon class="h-6 w-6 text-emerald-400" />
            <span class="text-lg font-bold text-emerald-100">NanoToxi AI</span>
          </router-link>
          
          <div class="hidden md:flex items-center space-x-6">
            <router-link 
              to="/" 
              class="nav-link"
              :class="{ 'text-emerald-300': $route.path === '/' }"
            >
              Home
            </router-link>
            <router-link 
              to="/predict" 
              class="nav-link"
              :class="{ 'text-emerald-300': $route.path === '/predict' }"
            >
              Predict
            </router-link>
            <router-link 
              to="/about" 
              class="nav-link"
              :class="{ 'text-emerald-300': $route.path === '/about' }"
            >
              About
            </router-link>
            <router-link 
              to="/contact" 
              class="nav-link"
              :class="{ 'text-emerald-300': $route.path === '/contact' }"
            >
              Contact
            </router-link>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-emerald-200 hover:text-emerald-400 focus:outline-none focus:text-emerald-400"
            >
              <MenuIcon class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div v-if="mobileMenuOpen" class="md:hidden py-4">
          <div class="flex flex-col space-y-2">
            <router-link to="/" @click="mobileMenuOpen = false" class="mobile-nav-link text-emerald-200">Home</router-link>
            <router-link to="/predict" @click="mobileMenuOpen = false" class="mobile-nav-link text-emerald-200">Predict</router-link>
            <router-link to="/about" @click="mobileMenuOpen = false" class="mobile-nav-link text-emerald-200">About</router-link>
            <router-link to="/contact" @click="mobileMenuOpen = false" class="mobile-nav-link text-emerald-200">Contact</router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="pt-20">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-emerald-900/20 border-t border-emerald-700/30 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <p class="text-emerald-200">© 2025 NanoToxi AI. All rights reserved.</p>
          <p class="text-emerald-400 text-sm mt-2">
            Contact: <a href="mailto:contact@nanotoxi.com" class="text-emerald-500 hover:text-emerald-300">contact@nanotoxi.com</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MoleculeIcon from './components/icons/MoleculeIcon.vue'
import MenuIcon from './components/icons/MenuIcon.vue'

const mobileMenuOpen = ref(false)
</script>

<style scoped>
.nav-link {
  @apply font-medium transition-colors duration-200;
}
.nav-link:hover {
  @apply text-blue-400;
}
.mobile-nav-link {
  @apply block px-3 py-2 transition-colors duration-200;
}
.mobile-nav-link:hover {
  @apply text-emerald-400 hover:bg-emerald-900/20;
}
</style>