<script setup>
  import { defineProps } from "vue";

  const { dataTitle, dataList, isIcon } = defineProps([
    "dataTitle",
    "dataList",
    "isIcon",
  ]);
</script>

<template>
  <div
    class="flex flex-row gap-4 mb-4 items-end justify-between w-full relative data-item"
  >
    <div class="project-details">
      <p>{{ dataTitle }}</p>
    </div>
    <div class="flex flex-row flex-wrap gap-x-2 justify-end items-end">
      <div v-if="isIcon" class="project-details w-7" v-for="item in dataList">
        <a :href="item.link">
          <img class="w-full" :src="item.platformIcon" alt="" />
        </a>
      </div>

      <div v-else v-for="(text, index) in dataList">
        <div class="project-details">
          <p v-if="index !== dataList.length - 1">{{ text }} -</p>
          <p v-else>{{ text }}</p>
        </div>
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
</style>
