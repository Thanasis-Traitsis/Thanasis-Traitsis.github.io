<script setup>
  import { defineProps } from "vue";

  const { dataTitle, dataValue } = defineProps(["dataTitle", "dataValue"]);

  const isArray = Array.isArray(dataValue);
</script>

<template>
  <div
    class="flex flex-row gap-4 mb-4 justify-between items-end w-full relative data-item"
  >
    <div class="project-details">
      <p>{{ dataTitle }}</p>
    </div>
    <div v-if="!isArray" class="project-details">
      <p>{{ dataValue }}</p>
    </div>
    <div v-else>
      <div v-for="value in dataValue" class="project-details mt-2 list-values">
        <p class="text-end">
          {{ value.creditsRole }} :
          <a id="credits_link" :href="value.creditsLink" target="_blank">{{ value.creditsTo }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .data-item::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 1px;
    background: var(--primary-color);
    bottom: -5px;
  }

  .list-values:first-child {
    margin-top: 0px !important;
  }

  #credits_link {
    text-decoration: underline;
  }
</style>
