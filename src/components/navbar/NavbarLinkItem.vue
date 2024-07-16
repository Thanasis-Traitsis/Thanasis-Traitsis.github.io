<script setup>
  import { defineProps } from "vue";
  import { RouterLink } from "vue-router";

  const { text, route } = defineProps(["text", "route"]);
</script>

<template>
  <div>
    <RouterLink class="nav-item" active-class="active" :to="route">{{
      text
    }}</RouterLink>
  </div>
</template>

<style scoped>
  .nav-item {
    text-transform: uppercase;
    position: relative;
    font-size: var(--navbar-link);
    font-weight: lighter;
    letter-spacing: 1.2px;
  }

  .nav-item::before {
    position: absolute;
    content: "";
    left: 0;
    bottom: -2px;
    width: 100%;
    transform: scaleX(0);
    height: 1px;
    background: var(--primary-color);
    transition: all 300ms ease-in-out;
    transform-origin: bottom left;
  }

  .nav-item:hover::before {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  .active::before {
    position: absolute;
    content: "";
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background: var(--primary-color);
    transform: scaleX(1);
  }
</style>
