<template>
  <div class="min-h-screen py-8 bg-gradient-to-br from-black via-emerald-900 to-gray-900">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Heading with Animation -->
      <div class="text-center mb-8" data-aos="fade-down">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Predict Nanoparticle Toxicity
        </h1>
        <p class="text-lg text-emerald-100">
          Enter the physicochemical properties of your nanoparticle for AI-powered toxicity prediction
        </p>
      </div>

      <!-- Form Card with Animated Entry -->
      <FormCard v-if="!showResults" data-aos="fade-up" data-aos-delay="100" class="bg-emerald-900/20 backdrop-blur-md border border-emerald-500/30 shadow-lg rounded-xl p-6">
        <form @submit.prevent="submitPrediction" class="space-y-6">
          <InputField
            v-model="form.nanoparticleId"
            label="Nanoparticle ID"
            type="text"
            placeholder="e.g., NP-001 (optional)"
            :required="false"
            data-aos="fade-right"
          />

          <InputField
            v-model="form.coreSize"
            label="Core Size (nm)"
            type="number"
            step="0.1"
            placeholder="e.g., 25.5"
            :required="true"
            :error="errors.coreSize"
            data-aos="fade-right"
            data-aos-delay="50"
          />

          <InputField
            v-model="form.hydrodynamicDiameter"
            label="Hydrodynamic Diameter (nm) - Optional"
            type="number"
            step="0.1"
            placeholder="e.g., 150.0 (leave empty to show pH/temp fields)"
            :required="false"
            data-aos="fade-right"
            data-aos-delay="100"
          />

          <div v-if="!form.hydrodynamicDiameter" class="space-y-6 transition-all duration-300">
            <InputField
              v-model="form.temperature"
              label="Temperature (°C)"
              type="number"
              step="0.1"
              placeholder="e.g., 37.0"
              :required="true"
              :error="errors.temperature"
              data-aos="fade-up"
              data-aos-delay="150"
            />

            <InputField
              v-model="form.environmentalPH"
              label="Environmental pH"
              type="number"
              step="0.1"
              placeholder="e.g., 7.4"
              :required="true"
              :error="errors.environmentalPH"
              data-aos="fade-up"
              data-aos-delay="200"
            />
          </div>

          <InputField
            v-model="form.zetaPotential"
            label="Zeta Potential (mV)"
            type="number"
            step="0.1"
            placeholder="e.g., -25.3"
            :required="true"
            :error="errors.zetaPotential"
            data-aos="fade-left"
            data-aos-delay="250"
          />

          <InputField
            v-model="form.surfaceArea"
            label="Surface Area (m²/g)"
            type="number"
            step="0.1"
            placeholder="e.g., 45.2"
            :required="true"
            :error="errors.surfaceArea"
            data-aos="fade-left"
            data-aos-delay="300"
          />

          <InputField
            v-model="form.bandgapEnergy"
            label="Bandgap Energy (eV)"
            type="number"
            step="0.01"
            placeholder="e.g., 3.2"
            :required="true"
            :error="errors.bandgapEnergy"
            data-aos="fade-left"
            data-aos-delay="350"
          />

          <InputField
            v-model="form.oxygenAtoms"
            label="Number of Oxygen Atoms"
            type="number"
            step="1"
            placeholder="e.g., 12"
            :required="true"
            :error="errors.oxygenAtoms"
            data-aos="fade-left"
            data-aos-delay="400"
          />

          <InputField
            v-model="form.dosage"
            label="Dosage (µg/mL)"
            type="number"
            step="0.1"
            placeholder="e.g., 100.0"
            :required="true"
            :error="errors.dosage"
            data-aos="fade-up"
            data-aos-delay="450"
          />

          <InputField
            v-model="form.exposureTime"
            label="Exposure Time (hours)"
            type="number"
            step="0.1"
            placeholder="e.g., 24.0"
            :required="true"
            :error="errors.exposureTime"
            data-aos="fade-up"
            data-aos-delay="500"
          />

          <SelectField
            v-model="form.proteinCorona"
            label="Protein Corona"
            :required="true"
            :error="errors.proteinCorona"
            :options="[
              { value: '', label: 'Select protein corona status' },
              { value: 'None', label: 'None' },
              { value: 'Present', label: 'Present' },
              { value: 'Unknown', label: 'Unknown' }
            ]"
            data-aos="fade-up"
            data-aos-delay="550"
          />

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-400 text-lg disabled:cursor-not-allowed"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <LoadingSpinner class="mr-3" />
              Predicting...
            </span>
            <span v-else>Predict Toxicity</span>
          </button>
        </form>
      </FormCard>

      <!-- Animated Results -->
      <ResultCard 
        v-if="showResults" 
        :results="results" 
        @reset="resetForm" 
        @toggle-json="showJson = !showJson"
        data-aos="zoom-in-up"
        data-aos-delay="100"
        class="bg-green/95 backdrop-blur-sm text-gray-800 rounded-xl shadow-lg"
      />

      <!-- Animated JSON Toggle -->
      <div v-if="showResults && showJson" class="mt-8" data-aos="fade-up" data-aos-delay="150">
        <div class="bg-gray-900 text-emerald-400 p-6 rounded-xl overflow-auto">
          <pre class="text-sm">{{ JSON.stringify(results, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onMounted } from 'vue'
import FormCard from '../components/FormCard.vue'
import InputField from '../components/InputField.vue'
import SelectField from '../components/SelectField.vue'
import ResultCard from '../components/ResultCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { predictionService } from '../services/api'
import AOS from 'aos'
import 'aos/dist/aos.css'

const loading = ref(false)
const showResults = ref(false)
const showJson = ref(false)
const results = ref(null)

const form = reactive({
  nanoparticleId: '',
  coreSize: '',
  hydrodynamicDiameter: '',
  temperature: '',
  environmentalPH: '',
  zetaPotential: '',
  surfaceArea: '',
  bandgapEnergy: '',
  oxygenAtoms: '',
  dosage: '',
  exposureTime: '',
  proteinCorona: ''
})

const errors = reactive({
  coreSize: '',
  temperature: '',
  environmentalPH: '',
  zetaPotential: '',
  surfaceArea: '',
  bandgapEnergy: '',
  oxygenAtoms: '',
  dosage: '',
  exposureTime: '',
  proteinCorona: ''
})

const validateForm = () => {
  let isValid = true
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  const requiredFields = ['coreSize', 'zetaPotential', 'surfaceArea', 'bandgapEnergy', 'oxygenAtoms', 'dosage', 'exposureTime', 'proteinCorona']
  if (!form.hydrodynamicDiameter) {
    requiredFields.push('temperature', 'environmentalPH')
  }
  requiredFields.forEach(field => {
    if (!form[field]) {
      errors[field] = 'This field is required'
      isValid = false
    }
  })
  return isValid
}

  // Validate numeric fields
  const numericFields = ['coreSize', 'hydrodynamicDiameter', 'temperature', 'environmentalPH', 'zetaPotential', 'surfaceArea', 'bandgapEnergy', 'oxygenAtoms', 'dosage', 'exposureTime']
  
  numericFields.forEach(field => {
    if (form[field] && isNaN(parseFloat(form[field]))) {
      errors[field] = 'Please enter a valid number'
      isValid = false
    }
  })
  
const submitPrediction = async () => {
  if (!validateForm()) return
  loading.value = true
  try {
    // Pass raw form data - the service will handle transformation
    const response = await predictionService.predict(form)
    results.value = response
    showResults.value = true
  } catch (error) {
    console.error('Prediction error:', error)
    alert('Failed to get prediction. Please try again.')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  showResults.value = false
  showJson.value = false
  results.value = null
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
}

// Initialize AOS on mount
onMounted(() => {
  AOS.init({ duration: 700, easing: 'ease-out-cubic', once: false })
})
</script>