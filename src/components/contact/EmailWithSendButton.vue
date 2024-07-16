<script setup>
  import { defineProps } from "vue";

  const { isWhite } = defineProps(["isWhite"]);
</script>

<template>
  <div class="flex flex-col">
    <div
      class="w-full border border-[var(--primary-color)] p-4 flex flex-col xl:h-[100%] xl:border-l-0"
    >
      <div class="xl:mt-auto">
        <p class="paragraph-text">Mail me at:</p>
      </div>
      <div>
        <p class="mail-text">thanasiswd@gmail.com</p>
      </div>
    </div>
    <div class="xl:border-r-[1px] xl:border-[var(--primary-color)]">
      <button
        :class="
          isWhite
            ? 'bg-[var(--white-color)] text-[var(--primary-color)] border-2 border-[var(--white-color)] hover:text-[var(--white-color)]'
            : 'bg-[var(--primary-color)] text-[var(--white-color)] border-2 border-[var(--primary-color)] hover:text-[var(--primary-color)]'
        "
        class="full-width-button hover:bg-[var(--gray-color)] transition ease-in-out duration-300"
        type="submit"
      >
        send
      </button>
    </div>
  </div>
</template>
