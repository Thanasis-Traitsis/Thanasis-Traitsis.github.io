<template>
  <div class="min-h-screen bg-white">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
    
    <!-- Error State -->
    <ErrorMessage v-else-if="error" :error="error" :on-retry="refetch" />
    
    <!-- Content -->
    <div v-else-if="data" class="max-w-7xl mx-auto px-6 py-20">
      <!-- Page Header -->
      <div class="mb-16">
        <h1 class="text-6xl md:text-7xl font-bold text-gray-900 mb-4 font-serif">Contact</h1>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent leading-none"
                style="-webkit-text-stroke: 2px #e5e7eb; text-stroke: 2px #B7B8BC;">
              <span class="font-serif">LET'S TALK</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Left Column - Info -->
        <div>
          <h3 class="text-3xl font-bold text-gray-900 mb-6 font-serif">Get in Touch</h3>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            Have a project in mind or just want to chat about mobile development? 
            Feel free to reach out. I'm always open to discussing new opportunities 
            and interesting projects.
          </p>

          <!-- Contact Info -->
          <div class="space-y-4">
            <div class="flex items-center justify-between gap-4 border border-gray-300 p-4">
              <div>
                <p class="text-sm text-gray-500 uppercase tracking-wide mb-1">Email</p>
                <a :href="`mailto:${data.email}`" class="text-lg text-gray-900 hover:text-gray-600 transition-colors">
                  {{ data.email }}
                </a>
              </div>
              <button
                @click="copyEmail"
                class="p-2 hover:bg-gray-100 hover:scale-110 active:scale-95 transition-all duration-200 rounded"
                aria-label="Copy email"
              >
                <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Copy Notification -->
          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-2"
          >
            <div
              v-if="showCopyNotification"
              class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 shadow-lg z-50"
            >
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Email copied to clipboard!</span>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Right Column - Form -->
        <div>
          <!-- Success Message -->
          <div v-if="formSubmitted" class="bg-gray-50 border border-gray-300 p-8 text-center">
            <svg class="w-16 h-16 text-gray-900 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p class="text-gray-600 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
            <button
              @click="resetForm"
              class="px-6 py-3 bg-gray-900 text-white hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Send Another Message
            </button>
          </div>

          <!-- Contact Form -->
          <form v-else @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Name and Surname Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="Name"
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="Surname"
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="example@mail.com"
              />
            </div>

            <!-- Subject -->
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="Project Inquiry"
              />
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <!-- Error Message -->
            <div v-if="formError" class="bg-red-50 border border-red-300 p-4">
              <p class="text-red-800">{{ formError }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="formSubmitting"
              class="w-full px-8 py-4 bg-gray-900 text-white hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg font-medium"
            >
              {{ formSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useSanityData } from '@/composables/useSanityData'
import { contactPageQuery } from '@/sanity/queries'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'

const { data, loading, error, refetch } = useSanityData(contactPageQuery)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const formSubmitting = ref(false)
const formSubmitted = ref(false)
const formError = ref('')
const showCopyNotification = ref(false)

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(data.value?.email || '')
    showCopyNotification.value = true
    setTimeout(() => {
      showCopyNotification.value = false
    }, 3000)
  } catch (err) {
    console.error('Failed to copy email:', err)
  }
}

async function handleSubmit() {
  formSubmitting.value = true
  formError.value = ''

  try {
    // Using Web3Forms - you'll need to get your access key from https://web3forms.com
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE',
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        subject: form.subject,
        message: form.message,
        from_name: 'Portfolio Contact Form',
        to_email: data.value?.email || 'your-email@example.com'
      })
    })

    const result = await response.json()

    if (result.success) {
      formSubmitted.value = true
    } else {
      throw new Error(result.message || 'Failed to send message')
    }
  } catch (err) {
    formError.value = 'Failed to send message. Please try again or email me directly.'
    console.error('Form submission error:', err)
  } finally {
    formSubmitting.value = false
  }
}

function resetForm() {
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  formSubmitted.value = false
  formError.value = ''
}
</script>
