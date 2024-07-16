<script setup>
  import FullScreenMenuNavbarLinkItem from "./FullScreenMenuNavbarLinkItem.vue";
</script>

<template>
  <div class="flex flex-col">
    <div class="text-above-line">
      <p>navigation .</p>
    </div>
    <div class="menu-line"></div>
    <FullScreenMenuNavbarLinkItem :text="'home'" :route="'/'" />
    <FullScreenMenuNavbarLinkItem :text="'about'" :route="'/about'" />
    <FullScreenMenuNavbarLinkItem :text="'projects'" :route="'/projects'" />
    <FullScreenMenuNavbarLinkItem :text="'contact'" :route="'/contact'" />
  </div>
</template>