<script setup>
  import { ref, defineProps, onMounted } from "vue";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";
  gsap.registerPlugin(ScrollTrigger);

  const props = defineProps({
    isWhite: Boolean,
    alignEnd: Boolean,
    text: String,
  });

  const sectionHeader = ref(null);
  const headerUnderline = ref(null);

  onMounted(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionHeader.value,
          start: "top 50%",
          end: "bottom 20%",
          scrub: false,
        },
      })
      .fromTo(headerUnderline.value, { scaleX: 0 }, { scaleX: 1, duration: 2 });
  });
</script>

<template>
  <div
    :class="alignEnd ? 'items-end' : 'items-start'"
    class="flex flex-col section-header"
    ref="sectionHeader"
  >
    <p
      :class="
        isWhite ? 'text-[var(--white-color)]' : 'text-[var(--primary-color)]',
        alignEnd ? 'text-end' : 'text-start'
      "
      class="section-header-text"
    >
      {{ text }}.
    </p>
    <div
      :class="
        isWhite ? 'bg-[var(--white-color)]' : 'bg-[var(--primary-color)]',
        alignEnd ? 'origin-left' : 'origin-right'
      "
      class="header-underline"
      ref="headerUnderline"
    ></div>
  </div>
</template>

<style scoped>
  .section-header {
    padding: 2em 0 1em;
  }
  .section-header-text {
    font-family: var(--highlight-font);
    font-size: var(--section-header);
    font-weight: bold;
    text-transform: capitalize;
    line-height: 1;
  }

  .header-underline {
    width: 100%;
    height: 1px;
  }
</style>
