<script setup>
  import { defineProps } from "vue";
  import { RouterLink } from "vue-router";

  const { text, route, isWhite } = defineProps(["text", "route", "isWhite"]);
</script>

<template>
  <div>
    <RouterLink
      :class="
        isWhite
          ? 'bg-[var(--white-color)] text-[var(--primary-color)] border-2 border-[var(--white-color)] hover:text-[var(--white-color)]'
          : 'bg-[var(--primary-color)] text-[var(--white-color)] border-2 border-[var(--primary-color)] hover:text-[var(--primary-color)]'
      "
      class="primary-button hover:bg-[var(--gray-color)] transition ease-in-out duration-300"
      :to="route"
      >{{ text }}</RouterLink
    >
  </div>
</template>
