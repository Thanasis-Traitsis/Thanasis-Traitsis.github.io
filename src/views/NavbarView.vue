<script setup>
  import { ref } from "vue";
  import gsap from "gsap";

  import BurgerIcon from "../components/navbar/BurgerIcon.vue";
  import HomeLogo from "../components/navbar/HomeLogo.vue";
  import NavbarItems from "../components/navbar/NavbarItems.vue";
  import FullScreenMenu from "../components/navbar/full_screen_menu/FullScreenMenu.vue";

  let showMenu = ref(false);

  // PREVENT MULTIPLE CLICKS DURING ANIMATION
  let clicksDisabled = false;

  const toggleNav = (isBurgerIcon) => {
    if (clicksDisabled) return; // Prevent clicks during the animation

    clicksDisabled = true;

    if (!showMenu.value) {
      openMenu();
    } else {
      closeMenu(isBurgerIcon);
    }

    setTimeout(() => {
      clicksDisabled = false;
    }, 1000); // Re-enable clicks after 1 second
  };

  // FULL SCREEN MENU ANIMATIONS

  const closeMenu = (isBurger) => {
    gsap.to(".menu", {
      right: "-100%",
      duration: 0.5,
      delay: isBurger ? 0 : 0.5,
      onComplete: () => {
        showMenu.value = false;
        document.body.style.overflow = "";
      },
    });
  };

  const openMenu = () => {
    gsap.to(".menu", {
      right: "0",
      duration: 0.5,
      onComplete: () => {
        showMenu.value = true;
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
    :showMenu="showMenu"
    @clickFullScreenLink="toggleNav(false)"
  />
</template>

<style scoped>
  .navbar {
    padding: var(--navbar-spacing) var(--screen-padding);
  }
</style>
