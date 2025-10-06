<template>
  <div class="glass-card rounded-2xl p-8 md:p-12 shadow-2xl bg-emerald-900/80">
    <div class="text-center mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
        Prediction Results
      </h2>
      <div class="inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold"
           :class="results?.toxicity === 'Toxic' ? 'bg-emerald-700/30 text-emerald-200 border border-emerald-500/50' : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'">
        {{ results?.toxicity || 'Unknown' }}
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- Cytotoxicity Effects -->
      <div>
        <h3 class="text-xl font-bold text-emerald-400 mb-4">Cytotoxicity</h3>
        <div class="space-y-3">
          <div v-if="results?.cytotoxicityEffects && results.cytotoxicityEffects.length > 0"
               class="flex items-center justify-between">
            <span class="text-emerald-100 font-medium">Cytotoxicity Result</span>
            <span class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="getCytotoxicityColor(results.cytotoxicityEffects[0]?.level)">
              {{ results.cytotoxicityEffects[0]?.level || 'Unknown' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Key Metrics -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">Analysis</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-emerald-300">Confidence Score</span>
            <span class="font-semibold text-white">{{ ((results?.confidence || 0) * 100).toFixed(1) }}%</span>
          </div>
          <div v-if="results?.hydrodynamicDiameter" class="flex justify-between">
            <span class="text-emerald-200">Hydrodynamic Diameter</span>
            <span class="font-semibold text-emerald-100">{{ results.hydrodynamicDiameter }}nm</span>
          </div>
          <div class="w-full bg-emerald-800 rounded-full h-2">
            <div class="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-500" 
                 :style="`width: ${(results?.confidence || 0) * 100}%`"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- API Response Details (if available) -->
    <div v-if="results?.apiResponse" class="mt-8">
      <h3 class="text-xl font-bold text-white mb-4">Detailed Analysis</h3>
      <div class="grid md:grid-cols-2 gap-6" v-if="results?.hydrodynamicDiameter">
        <!-- Toxicity -->
        <div class="glass-effect p-4 rounded-lg bg-emerald-700/40">
          <h4 class="font-semibold text-emerald-300 mb-2">Stage 1: Toxicity</h4>
          <div class="space-y-1 text-sm text-emerald-200">
            <p><span class="font-medium">Prediction:</span> {{ results.apiResponse.stage1?.toxicity_prediction || 'N/A' }}</p>
            <p><span class="font-medium">Risk Level:</span> {{ results.apiResponse.stage1?.risk_level || 'N/A' }}</p>
            <p><span class="font-medium">Composite Score:</span> {{ ((results.apiResponse.stage1?.composite_score || 0) * 100).toFixed(1) }}%</p>
          </div>
        </div>
        <!-- Cytotoxicity -->
        <div class="glass-effect p-4 rounded-lg bg-emerald-700/40">
          <h4 class="font-semibold text-emerald-300 mb-2">Stage 2: Cytotoxicity</h4>
          <div class="space-y-2 text-sm text-emerald-200">
            <p><span class="font-medium">Cytotoxicity:</span> {{ results.apiResponse.stage2?.cytotoxicity_result || 'Unknown' }}</p>
          </div>
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-6" v-else>
        <!-- Aggregation -->
        <div class="glass-effect p-4 rounded-lg bg-emerald-700/40">
          <h4 class="font-semibold text-emerald-300 mb-2">Stage 1: Aggregation</h4>
          <div class="space-y-1 text-sm text-emerald-200">
            <p><span class="font-medium">Hydrodynamic Diameter:</span> {{ results.apiResponse.stage1?.predicted_hydrodynamic_diameter || 'N/A' }}nm</p>
            <p><span class="font-medium">Aggregation Factor:</span> {{ results.apiResponse.stage1?.aggregation_factor || 'N/A' }}</p>
            <p><span class="font-medium">Stability:</span> {{ results.apiResponse.stage1?.stability_assessment || 'N/A' }}</p>
          </div>
        </div>
        <!-- Toxicity -->
        <div class="glass-effect p-4 rounded-lg bg-emerald-700/40">
          <h4 class="font-semibold text-emerald-300 mb-2">Stage 2: Toxicity</h4>
          <div class="space-y-1 text-sm text-emerald-200">
            <p><span class="font-medium">Prediction:</span> {{ results.apiResponse.stage2?.toxicity_prediction || 'N/A' }}</p>
            <p><span class="font-medium">Risk Level:</span> {{ results.apiResponse.stage2?.risk_level || 'N/A' }}</p>
            <p><span class="font-medium">Composite Score:</span> {{ ((results.apiResponse.stage2?.composite_score || 0) * 100).toFixed(1) }}%</p>
          </div>
        </div>
        <!-- Cytotoxicity -->
        <div class="glass-effect p-4 rounded-lg bg-emerald-700/40">
          <h4 class="font-semibold text-emerald-300 mb-2">Stage 3: Cytotoxicity</h4>
          <div class="space-y-2 text-sm text-emerald-200">
            <p><span class="font-medium">Cytotoxicity:</span> {{ results.apiResponse.stage3?.cytotoxicity_result || 'Unknown' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Drivers -->
    <div class="mt-8">
      <h3 class="text-xl font-bold text-emerald-300 mb-4">Key Drivers</h3>
      <div class="flex flex-wrap gap-2">
        <span v-for="driver in (results?.keyDrivers || [])" :key="driver"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
          {{ driver }}
        </span>
      </div>
    </div>

    <!-- Citations -->
    <div class="mt-8">
      <h3 class="text-xl font-bold text-emerald-300 mb-4">Related Studies</h3>
      <div class="space-y-2">
        <p v-for="citation in (results?.citations || [])" :key="citation.title" 
           class="text-sm text-emerald-200">
          <span class="font-medium">{{ citation.title }}</span> - {{ citation.journal }} ({{ citation.year }})
        </p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-emerald-700/40">
      <button @click="$emit('toggle-json')" class="btn-secondary">
        Toggle JSON View
      </button>
      <button @click="$emit('reset')" class="btn-primary">
        New Prediction
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CytotoxicityEffect {
  mechanism: string
  level: string
}

interface Citation {
  title: string
  journal: string
  year: number
}

interface Results {
  toxicity?: string
  cytotoxicityEffects?: CytotoxicityEffect[]
  confidence?: number
  keyDrivers?: string[]
  citations?: Citation[]
  apiResponse?: any
  hydrodynamicDiameter?: number
}

interface Props {
  results?: Results
}

defineProps<Props>()
defineEmits<{
  reset: []
  'toggle-json': []
}>()

// Cytotoxicity color mapping for result ("Cytotoxic" or "Non-Cytotoxic")
const getCytotoxicityColor = (level: string) => {
  if (!level) return 'bg-gray-100 text-gray-600'
  const lowerLevel = level.toLowerCase()
  if (lowerLevel === 'cytotoxic') {
    return 'bg-emerald-900 text-red-100 border border-red-300'
  }
  if (lowerLevel === 'non-cytotoxic') {
    return 'bg-emerald-200 text-emerald-900 border border-emerald-400'
  }
  return 'bg-gray-100 text-gray-600 border border-gray-200'
}
</script>
