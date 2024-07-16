<script setup>
  import BigHeader from "@/components/BigHeader.vue";
  import AllProjectsList from "@/components/projects/AllProjectsList.vue";
  import ContactSection from "@/components/contact/ContactSection.vue";
  import FooterSection from "@/components/footer/FooterSection.vue";
</script>

<template>
  <div>
    <BigHeader
      :changeLine="true"
      :text1="'Where ideas thrive:'"
      :text2="'journey through projects.'"
    />
    <AllProjectsList />
    <ContactSection />
    <FooterSection />
  </div>
</template>
