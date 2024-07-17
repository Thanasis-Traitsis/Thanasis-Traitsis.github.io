<script setup>
  import { defineEmits } from "vue";
  import FullScreenMenuNavbarLinkItem from "./FullScreenMenuNavbarLinkItem.vue";

  const emit = defineEmits(["clickFullScreenLink"]);

  const handleLinkClick = () => {
    emit("clickFullScreenLink");
  };
</script>

<template>
  <div class="flex flex-col">
    <div class="text-above-line">
      <p>navigation.</p>
    </div>
    <div class="menu-line"></div>
    <FullScreenMenuNavbarLinkItem
      :text="'home'"
      :route="'/'"
      @clickFullScreenLink="handleLinkClick"
    />
    <FullScreenMenuNavbarLinkItem
      :text="'about'"
      :route="'/about'"
      @clickFullScreenLink="handleLinkClick"
    />
    <FullScreenMenuNavbarLinkItem
      :text="'projects'"
      :route="'/projects'"
      @clickFullScreenLink="handleLinkClick"
    />
    <FullScreenMenuNavbarLinkItem
      :text="'contact'"
      :route="'/contact'"
      @clickFullScreenLink="handleLinkClick"
    />
  </div>
</template>
