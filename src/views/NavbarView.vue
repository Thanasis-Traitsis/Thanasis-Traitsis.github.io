<script setup>
  import { ref } from "vue";
  import gsap from "gsap";

  import BurgerIcon from "../components/navbar/BurgerIcon.vue";
  import HomeLogo from "../components/navbar/HomeLogo.vue";
  import NavbarItems from "../components/navbar/NavbarItems.vue";
  import FullScreenMenu from "../components/navbar/full_screen_menu/FullScreenMenu.vue";

  let showMenu = ref(false);

  const toggleNav = () => {
    if (!showMenu.value) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  // FULL SCREEN MENU ANIMATION
  const closeMenu = () => {
    gsap.to(".menu", {
      right: "-100%",
      duration: 0.5,
      delay: 0.5,
      onComplete: () => {
        showMenu.value = !showMenu.value;
        document.body.style.overflow = "";
      },
    });
  };

  const openMenu = () => {
    gsap.to(".menu", {
      right: "0",
      duration: 0.5,
      delay: 0.5,
      onComplete: () => {
        showMenu.value = !showMenu.value;
        document.body.style.overflow = "hidden";
      },
    });
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
  <FullScreenMenu :showMenu="showMenu" @clickFullScreenLink="toggleNav" />
</template>

<style scoped>
  .navbar {
    padding: var(--navbar-spacing) var(--screen-padding);
  }
</style>
