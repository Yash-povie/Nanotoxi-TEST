<template>
  <div class="min-h-screen py-16 bg-gradient-to-br from-black via-emerald-900 to-gray-900">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Contact Us
        </h1>
        <p class="text-xl text-emerald-100">
          Get in touch with our team for inquiries, collaborations, or support
        </p>
      </div>

      <FormCard v-if="!submitted" class="bg-emerald-900/20 backdrop-blur-md border border-emerald-500/30">
        <form @submit.prevent="submitContact" class="space-y-6">
          <InputField
            v-model="form.name"
            label="Name"
            type="text"
            placeholder="Your full name"
            :required="true"
            :error="errors.name"
          />

          <InputField
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            :required="true"
            :error="errors.email"
          />

          <div class="space-y-2">
            <label for="attachment" class="block text-sm font-medium text-emerald-100">
              Attachment (Optional)
            </label>
            <input
              id="attachment"
              type="file"
              @change="handleFileUpload"
              class="w-full px-4 py-3 border border-emerald-500 rounded-xl focus:ring-4 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 bg-emerald-900/30 text-emerald-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-600 file:text-white hover:file:bg-emerald-700"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            <p class="text-emerald-300 text-xs">
              Supported formats: PDF, DOC, DOCX, TXT, JPG, JPEG, PNG (Max 10MB)
            </p>
            <p v-if="selectedFile" class="text-emerald-200 text-sm">
              Selected: {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
            </p>
          </div>

          <div class="space-y-2">
            <label for="message" class="block text-sm font-medium text-emerald-100">
              Message
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="6"
              class="w-full px-4 py-3 border border-emerald-500 rounded-xl focus:ring-4 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 bg-emerald-900/30 text-emerald-100 placeholder-emerald-300 resize-none"
              placeholder="Tell us about your project, questions, or how we can help..."
              required
            ></textarea>
            <p v-if="errors.message" class="text-red-400 text-sm">{{ errors.message }}</p>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-400 text-lg disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <LoadingSpinner class="mr-3" />
              Sending...
            </span>
            <span v-else>Send Message</span>
          </button>
        </form>
      </FormCard>

      <!-- Success Message -->
      <div v-if="submitted" class="text-center">
        <div class="bg-emerald-900/20 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-12">
          <div class="text-emerald-400 mb-4">
            <CheckIcon class="h-16 w-16 mx-auto" />
          </div>
          <h2 class="text-2xl font-bold text-white mb-4">Thank You!</h2>
          <p class="text-lg text-emerald-100 mb-8">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <button @click="resetForm" class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-400">
            Send Another Message
          </button>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="mt-16 bg-emerald-900/20 backdrop-blur-md border border-emerald-500/30 rounded-2xl shadow-xl p-8">
        <h3 class="text-xl font-bold text-white mb-4">Other Ways to Reach Us</h3>
        <div class="space-y-3">
          <p class="text-emerald-100">
            <span class="font-medium">Email:</span> 
            <a href="mailto:contact@nanotoxi.com" class="text-emerald-400 hover:text-emerald-300">
              contact@nanotoxi.com
            </a>
          </p>
          <p class="text-emerald-100">
            <span class="font-medium">Response Time:</span> Within 24 hours
          </p>
          <p class="text-emerald-100">
            <span class="font-medium">Office Hours:</span> Mon-Fri, 9 AM - 5 PM EST
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import FormCard from '../components/FormCard.vue'
import InputField from '../components/InputField.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import CheckIcon from '../components/icons/CheckIcon.vue'
import { contactService } from '../services/api'

const loading = ref(false)
const submitted = ref(false)
const selectedFile = ref<File | null>(null)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      target.value = ''
      selectedFile.value = null
      return
    }
    selectedFile.value = file
  } else {
    selectedFile.value = null
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  // Required field validation
  if (!form.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required'
    isValid = false
  }

  return isValid
}

const submitContact = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true
  
  try {
    const contactData = {
      name: form.name,
      email: form.email,
      message: form.message,
      attachment: selectedFile.value
    }
    
    const result = await contactService.submitContact(contactData)
    
    if (result.success) {
      submitted.value = true
    } else {
      alert(result.message || 'Failed to send message. Please try again.')
    }
  } catch (error) {
    console.error('Contact submission error:', error)
    alert('Failed to send message. Please check your connection and try again.')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  submitted.value = false
  selectedFile.value = null
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  // Reset file input
  const fileInput = document.getElementById('attachment') as HTMLInputElement
  if (fileInput) {
    fileInput.value = ''
  }
}
</script>