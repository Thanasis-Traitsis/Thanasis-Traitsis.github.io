<script setup>
  import BigHeader from "@/components/BigHeader.vue";
  import FooterSection from "@/components/footer/FooterSection.vue";
  import ContactForm from "@/components/contact/ContactForm.vue";
</script>

<template>
  <div>
    <BigHeader
      :changeLine="true"
      :text1="'Do you have any'"
      :text2="'project ideas?'"
    />
    <ContactForm /> 
    <FooterSection />
  </div>
</template>
