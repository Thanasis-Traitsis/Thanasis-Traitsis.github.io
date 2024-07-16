<script setup>
  import BigHeader from "@/components/BigHeader.vue";
  import AboutImageAndText from "../components/about/AboutImageAndText.vue";
  import AboutProjects from "../components/about/AboutProjects.vue";
  import ContactSection from "@/components/contact/ContactSection.vue";
  import FooterSection from "@/components/footer/FooterSection.vue";
</script>

<template>
  <div>
    <BigHeader
      :changeLine="false"
      :text1="'Unleashing my creativity through app development.'"
    />
    <AboutImageAndText />
    <AboutProjects />
    <ContactSection />
    <FooterSection />
  </div>
</template>
