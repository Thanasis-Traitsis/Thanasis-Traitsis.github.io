<script setup>
  import { ref } from "vue";
  import gsap from "gsap";

  import BurgerIcon from "../components/navbar/BurgerIcon.vue";
  import HomeLogo from "../components/navbar/HomeLogo.vue";
  import NavbarItems from "../components/navbar/NavbarItems.vue";
  import FullScreenMenu from "../components/navbar/full_screen_menu/FullScreenMenu.vue";

  let showMenu = ref(false);

  // PREVENT MULTIPLE CLICKS DURING ANIMATION
  let clicksDisabled = ref(false);

  const toggleNav = (isBurgerIcon) => {
    if (clicksDisabled.value) return;

    clicksDisabled.value = true;

    if (!showMenu.value) {
      openMenu();
    } else {
      closeMenu(isBurgerIcon);
    }

    setTimeout(() => {
      clicksDisabled.value = false;
    }, 1000);
  };

  // FULL SCREEN MENU ANIMATIONS

  const closeMenu = (isBurger) => {
    showMenu.value = false;
    gsap.to(".menu", {
      right: "-100%",
      duration: 0.5,
      delay: isBurger ? 0 : 0.5,
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });
  };

  const openMenu = () => {
    showMenu.value = true;
    gsap.to(".menu", {
      right: "0",
      duration: 0.5,
      delay: 0.3,
      onComplete: () => {
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
      <BurgerIcon @click="toggleNav(true)" :showMenu="showMenu" />
    </div>
    <NavbarItems />
  </header>
  <FullScreenMenu
    :class="clicksDisabled ? 'pointer-events-none' : 'pointer-events-auto'"
    :showMenu="showMenu"
    @clickFullScreenLink="toggleNav(false)"
  />
</template>

<style scoped>
  .navbar {
    padding: var(--navbar-spacing) var(--screen-padding);
  }
</style>
