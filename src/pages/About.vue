<template>
  <div class="min-h-screen py-16 bg-gradient-to-br from-black via-emerald-900 to-gray-900 transition-colors duration-500">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Heading -->
      <div class="text-center mb-16" data-aos="fade-down">
        <h1 class="text-4xl md:text-5xl font-bold text-white drop-shadow mb-6">
          About NanoToxi AI
        </h1>
        <div class="prose prose-lg prose-invert mx-auto">
          <p class="text-xl text-emerald-100 leading-relaxed" data-aos="fade-up" data-aos-delay="80">
            NanoToxi AI is an AI-powered platform designed to predict nanoparticle toxicity and cytotoxicity using physicochemical descriptors. Inspired by cutting-edge research, it enables faster, safer, and more cost-effective nanomaterial risk assessment.
          </p>
        </div>
      </div>

      <!-- Mission Card (Glassmorphism) -->
      <div class="mb-16" data-aos="fade-up" data-aos-delay="150">
        <h2 class="text-3xl font-bold text-white mb-8 text-center drop-shadow">
          Our Mission
        </h2>
        <div class="bg-emerald-900/20 backdrop-blur-lg border border-emerald-500/30 rounded-2xl shadow-xl p-8 md:p-12">
          <p class="text-lg text-emerald-100 leading-relaxed mb-6">
            Our mission is to revolutionize nanotoxicology through artificial intelligence, making nanomaterial safety assessment more accessible, accurate, and efficient. We believe that by leveraging machine learning and comprehensive datasets, we can accelerate the development of safe-by-design nanomaterials.
          </p>
          <p class="text-lg text-emerald-100 leading-relaxed">
            NanoToxi AI bridges the gap between complex physicochemical properties and biological effects, empowering researchers, manufacturers, and regulators to make informed decisions about nanomaterial safety.
          </p>
        </div>
      </div>

      <!-- Team Section -->
      <div data-aos="fade-up" data-aos-delay="240">
        <h2 class="text-3xl font-bold text-white mb-12 text-center drop-shadow">
          Meet Our Team
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <TeamMemberCard
            name="Yash Pramod Wasnik"
            role="Full-Stack AI/ML Engineer "
            bio="Led AI projects for the Government of Zambia/Ministry of Green Economy & Environment, Makerere University in Uganda, and several Indian and African universities along with deveolping Full Stack Appilications."
            profile-image="https://media.licdn.com/dms/image/v2/D5603AQEtOeptVc1nvw/profile-displayphoto-shrink_200_200/B56ZZ79yJ0HgAc-/0/1745836517374?e=1762387200&v=beta&t=wwl5dflyYxqYEd7I_XzNhgJ5uTb4e_Pip163h5crM5I"
            linkedin-url="https://linkedin.com/in/yashwasnik"
            class="bg-emerald-900/20 backdrop-blur-lg border border-emerald-500/30 shadow-xl text-emerald-100"
            data-aos="zoom-in-up"
            data-aos-delay="260"
          />
          <TeamMemberCard
            name="Ronith Lahoti"
            role="Founder"
            bio="Previously worked with Sudarshan Chemicals R&D, research at UPenn and the Singh Center for Nanotechnology. Raised $12,000 for chemical-recycling initiative in high school."
            profile-image="https://media.licdn.com/dms/image/v2/D4D03AQHOBNbZlZlpzQ/profile-displayphoto-crop_800_800/B4DZfvBtH.GsAI-/0/1752061893818?e=1762387200&v=beta&t=DPd3leG2kHfoiq4K_2D7i8swng7rQ1MuWPGX5d-OxaI"
            linkedin-url="https://www.linkedin.com/in/ronithlahoti/"
            class="bg-emerald-900/20 backdrop-blur-lg border border-emerald-500/30 shadow-xl text-emerald-100"
            data-aos="zoom-in-up"
            data-aos-delay="280"
          />
          <TeamMemberCard
            name="Dr. Swapnil Gaikward"
            role="Subject Expert"
            bio="Researcher in Nanotechnology and Mycology (4031+ Citations, 31 h-index). Post-Doctoral fellow at Department of Biotechnology Engineering School of Lorena, University of Sao Paulo (EEL-USP) Brazil."
            profile-image="https://media.licdn.com/dms/image/v2/C4E03AQFen_NtPvC52A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516459693012?e=1762387200&v=beta&t=guxoG0JJQcxafwRlF2y7sVoP23oQBuVnHN-nFyMNKQ0"
            linkedin-url="https://www.linkedin.com/in/dr-swapnil-c-gaikwad-87623a72/"
            class="bg-emerald-900/20 backdrop-blur-lg border border-emerald-500/30 shadow-xl text-emerald-100"
            data-aos="zoom-in-up"
            data-aos-delay="300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TeamMemberCard from '../components/TeamMemberCard.vue'
</script>
