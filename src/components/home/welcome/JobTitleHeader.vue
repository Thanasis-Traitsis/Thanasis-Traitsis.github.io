<script setup>
  import jobTitles from "../../../../public/assets/json/job-title.json";
</script>

<template>
  <div>
    <div v-for="(title, index) in jobTitles" :key="title.id" class="job-title">
      <h1 v-if="index !== jobTitles.length - 1">{{ title.jobTitle }} /</h1>
      <h1 v-else>{{ title.jobTitle }}.</h1>
    </div>
  </div>
</template>

<style scoped>
  .job-title h1 {
    color: var(--primary-color);
    font-size: var(--big-highlighttext);
    font-family: var(--highlight-font);
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: .4rem;
  }
</style>
