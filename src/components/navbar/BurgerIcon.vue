<script setup>
  import { defineProps, ref, watch, onMounted } from "vue";
  import gsap from "gsap";

  const props = defineProps({
    showMenu: Boolean,
  });

  let menuIsOpen = ref(props.showMenu);
  const burgerTimeline = gsap.timeline();

  watch(
    () => props.showMenu,
    (newValue) => {
      menuIsOpen.value = newValue;

      if (menuIsOpen.value) {
        burgerTimeline
          .fromTo("#first_line", { scaleX: 1 }, { scaleX: 0, duration: 0.3 })
          .fromTo(
            "#second_line",
            { scaleX: 1 },
            { scaleX: 0, duration: 0.3 },
           "<"
          )
          .fromTo(
            "#third_line",
            { scaleX: 1 },
            { scaleX: 0, duration: 0.3 },
            "<"
          );

        burgerTimeline
          .to("#first_line", {
            scaleX: 1,
            rotate: "-45deg",
            backgroundColor: "white",
            position: "absolute",
            transformOrigin: "center",
            duration: 0.3,
          })
          .to(
            "#second_line",
            {
              scaleX: 1,
              rotate: "45deg",
              backgroundColor: "white",
              position: "absolute",
              transformOrigin: "center",
              duration: 0.3,
            },
            "<"
          );
      } else {
        burgerTimeline
          .to("#first_line", {
            scaleX: 0,
            backgroundColor: "white",
            position: "absolute",
            transformOrigin: "center",
            duration: 0.3,
          })
          .to(
            "#second_line",
            {
              scaleX: 0,
              backgroundColor: "white",
              position: "absolute",
              transformOrigin: "center",
              duration: 0.3,
            },
            "<"
          )
          .to("#first_line", {
            rotate: "0deg",
          })
          .to(
            "#second_line",
            {
              rotate: "0deg",
            },
            "<"
          );

        burgerTimeline
          .to("#first_line", {
            scaleX: 1,

            backgroundColor: "#373f41",
            position: "relative",
            transformOrigin: "right",
            duration: 0.3,
          })
          .to(
            "#second_line",
            {
              scaleX: 1,
              backgroundColor: "#373f41",
              position: "relative",
              transformOrigin: "right",
              duration: 0.3,
            },
            "<"
          )
          .to("#third_line", { scaleX: 1, duration: 0.3 }, "<");
      }
    }
  );
</script>

<template>
  <div
    id="burger"
    class="w-8 h-full flex flex-col items-end relative justify-evenly"
  >
    <div id="first_line" class="burger_icon-line w-[100%]"></div>
    <div id="second_line" class="burger_icon-line w-[100%]"></div>
    <div id="third_line" class="burger_icon-line w-[70%]"></div>
  </div>
</template>

<style scoped>
  .burger_icon-line {
    background: var(--primary-color);
    height: 3px;
    transform-origin: right;
  }
</style>
