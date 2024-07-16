<script setup>
  import NavbarLinkItem from "./NavbarLinkItem.vue";
</script>

<template>
  <div class="hidden md:flex flex-row gap-6 xl:gap-8">
    <NavbarLinkItem :text="'about'" :route="'/about'" />
    <NavbarLinkItem :text="'projects'" :route="'/projects'" />
    <NavbarLinkItem :text="'contact'" :route="'/contact'" />
  </div>
</template>
