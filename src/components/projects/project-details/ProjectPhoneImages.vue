<script setup>
  import { defineProps, onMounted, watch } from "vue";
  // import gsap from "gsap";
  // import ScrollTrigger from "gsap/ScrollTrigger";
  // gsap.registerPlugin(ScrollTrigger);

  const { phoneImages } = defineProps(["phoneImages"]);

  // onMounted(() => {
  //   let mm = gsap.matchMedia();

  //   mm.add("(min-width: 1290px)", () => {
  //     const elements = document.querySelectorAll(".project_images div");

  //     for (let i = 0; i < elements.length; i += 3) {
  //       const el1 = elements[i];
  //       const el2 = elements[i + 1];
  //       const el3 = elements[i + 2];
  //       const elementsToAnimate = [el1, el2, el3].filter(Boolean);

  //       gsap
  //         .timeline({
  //           scrollTrigger: {
  //             trigger: elementsToAnimate[0],
  //             start: "top 50%",
  //             end: "bottom 90%",
  //             scrub: true,
  //           },
  //         })
  //         .fromTo(elementsToAnimate[0], { x: "-50vw" }, { x: 0, duration: 2 })
  //         .fromTo(
  //           elementsToAnimate[2],
  //           { x: "50vw" },
  //           { x: 0, duration: 2 },
  //           "<"
  //         );
  //     }

  //     if (elements.length % 3 !== 0) {
  //       const lastElement = elements[elements.length - (elements.length % 3)];
  //       gsap
  //         .timeline({
  //           scrollTrigger: {
  //             trigger: lastElement,
  //             start: "top 50%",
  //             end: "bottom 20%",
  //             scrub: true,
  //           },
  //         })
  //         .fromTo(lastElement, { x: "-50vw" }, { x: 0, duration: 1 });
  //     }
  //   });
  // });
</script>

<template>
  <div
    class="flex flex-col gap-10 section md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-20 xl:max-w-[1300px] xl:content-between xl:m-auto xl:!mb-[calc(var(--section-margin)*2)]"
  >
    <div v-for="img in phoneImages" class="project_images">
      <div class="w-full">
        <img class="w-full" :src="img" alt="" />
      </div>
    </div>
  </div>
</template>
