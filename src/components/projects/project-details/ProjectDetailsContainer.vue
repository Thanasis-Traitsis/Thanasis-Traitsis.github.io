<script setup>
  import { defineProps } from "vue";
  import ProjectDataSingleItem from "./ProjectDataSingleItem.vue";
  import ProjectDataSingleItemWithMultipleValues from "./ProjectDataSingleItemWithMultipleValues.vue";

  const { title, year, category, isAvailable, techList, credits, description } =
    defineProps([
      "title",
      "year",
      "category",
      "isAvailable",
      "techList",
      "credits",
      "description",
    ]);
</script>

<template>
  <div class="section flex flex-col gap-10 w-full md:grid md:grid-cols-5 xl:grid-cols-2">
    <div class="flex flex-col w-full md:col-start-1 md:col-end-4 xl:col-end-2">
      <div class="italic-headline-text -ml-4 xl:absolute xl:-mt-12">
        <p>About Project</p>
      </div>
      <div class="flex flex-col xl:mt-10">
        <ProjectDataSingleItem :dataTitle="'title'" :dataValue="title" />
        <ProjectDataSingleItem :dataTitle="'year'" :dataValue="year" />
        <ProjectDataSingleItem :dataTitle="'category'" :dataValue="category" />
        <ProjectDataSingleItemWithMultipleValues
          v-if="isAvailable.length != 0"
          :dataTitle="'available at'"
          :dataList="isAvailable"
          :isIcon="true"
        />
        <ProjectDataSingleItemWithMultipleValues
          :dataTitle="'tech'"
          :dataList="techList"
          :isIcon="false"
        />
        <ProjectDataSingleItem
          v-if="credits.length != 0"
          :dataTitle="'credits'"
          :dataValue="credits"
        />
      </div>
    </div>
    <div class="md:col-start-4 md:col-end-6 xl:col-start-2 xl:col-end-3 xl:mt-10">
      <p class="paragraph-text">{{ description }}</p>
    </div>
  </div>
</template>
