<script setup>
  import { defineProps } from "vue";
  import FullWidthButton from "./FullWidthButton.vue";

  const { id, title, category, date, isWhite } = defineProps([
    "id",
    "title",
    "category",
    "date",
    "isWhite",
  ]);
</script>

<template>
  <div class="flex flex-col gap-4 mt-10 md:flex-row">
    <div class="flex flex-col md:w-full xl:grid xl:grid-cols-2">
      <div class="project-title xl:row-start-1 xl:row-end-2 xl:items-end">
        <p
          :class="
            isWhite
              ? 'text-[var(--white-color)]'
              : 'text-[var(--primary-color)]'
          "
        >
          {{ title }}
        </p>
      </div>
      <div
        class="project-title-underline xl:col-span-2"
        :class="
          isWhite ? 'bg-[var(--white-color)]' : 'bg-[var(--primary-color)]'
        "
      ></div>
      <div
        class="flex flex-row justify-between xl:row-start-1 xl:row-end-2 xl:items-end"
      >
        <div class="project-details">
          <p
            :class="
              isWhite
                ? 'text-[var(--white-color)]'
                : 'text-[var(--primary-color)]'
            "
          >
            {{ category }}
          </p>
        </div>
        <div class="project-details">
          <p
            :class="
              isWhite
                ? 'text-[var(--white-color)]'
                : 'text-[var(--primary-color)]'
            "
          >
            {{ date }}
          </p>
        </div>
      </div>
    </div>
    <FullWidthButton
      class="md:w-min xl:max-w-[var(--xlbutton-size)] xl:w-full"
      :isWhite="isWhite"
      :text="'view details'"
      :route="`/projects/${id}`"
    />
  </div>
</template>

<style scoped>
  .project-title-underline {
    width: 100%;
    height: 1px;
    margin: 0.4em 0;
  }
</style>
