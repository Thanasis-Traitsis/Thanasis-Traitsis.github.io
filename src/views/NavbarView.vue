<script setup>
  import { ref } from "vue";

  import BurgerIcon from "../components/navbar/BurgerIcon.vue";
  import HomeLogo from "../components/navbar/HomeLogo.vue";
  import NavbarItems from "../components/navbar/NavbarItems.vue";
  import FullScreenMenu from "../components/navbar/full_screen_menu/FullScreenMenu.vue";

  let showMenu = ref(false);

  const toggleNav = () => {
    showMenu.value = !showMenu.value;
    if (showMenu.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };
</script>

<template>
  <header
    class="bg-transparent w-full navbar flex flex-row justify-between md:items-center"
  >
    <HomeLogo />
    <div class="md:hidden z-10">
      <BurgerIcon @click="toggleNav" :showMenu="showMenu" />
    </div>
    <NavbarItems />
  </header>
  <FullScreenMenu :showMenu="showMenu" />
</template>

<style scoped>
  .navbar {
    padding: var(--navbar-spacing) var(--screen-padding);
  }
</style>
