<script setup>
  import { defineProps } from "vue";

  let { showMenu } = defineProps(["showMenu"]);
</script>

<template>
  <div
    :class="showMenu ? 'justify-center' : 'justify-evenly'"
    class="w-8 h-full flex flex-col items-end relative"
  >
    <div
      :id="showMenu ? 'first_line' : ''"
      :class="showMenu ? 'close-icon' : 'burger_icon-line w-[100%]'"
    ></div>
    <div
      :id="showMenu ? 'second_line' : ''"
      :class="showMenu ? 'close-icon' : 'burger_icon-line w-[100%]'"
    ></div>
    <div :class="showMenu ? 'w-0' : 'burger_icon-line w-[70%]'"></div>
  </div>
</template>

<style scoped>
  .burger_icon-line {
    background: var(--primary-color);
    height: 3px;
  }

  .close-icon {
    background: var(--white-color);
    width: 100%;
    height: 3px;
    position: absolute;
  }

  #first_line {
    transform: rotate(45deg);
  }

  #second_line {
    transform: rotate(-45deg);
  }
</style>
