<script setup>
  import { onMounted } from "vue";
  import gsap from "gsap";

  onMounted(() => {
    const animationRan = sessionStorage.getItem("animationRan");

    const timeline = gsap.timeline();
    if (!animationRan) {
      timeline
        .fromTo(
          "#surname_underline",
          { scaleX: 0 },
          { scaleX: 1, duration: 1, delay: 1 }
        )
        .fromTo("#welcome_line", { scaleY: 0 }, { scaleY: 1, duration: 1 })
        .fromTo("#welcome_img", { opacity: 0 }, { opacity: 1, duration: 2.5 });

      sessionStorage.setItem("animationRan", "true");
    }

    const scrl = document.querySelector("#scroll_text");
    const letters = scrl.textContent.split("");

    scrl.textContent = "";

    letters.forEach((letter) => {
      scrl.innerHTML += '<span class="letter">' + letter + "</span>";
    });

    gsap.set(".letter", { display: "inline-block" });
    timeline.fromTo(
      ".letter",
      { x: 15 },
      { x: 0, stagger: 0.2, yoyo: true, repeat: -1 }
    );
  });
</script>

<template>
  <div class="seld-end flex flex-row justify-end items-end ml-6">
    <div
      class="relative mb-10 flex flex-row items-end max-w-[400px] xl:max-w-[500px]"
    >
      <div
        class="flex flex-col gap-3 welcome-text mr-[-130px] z-[8] pb-12 pt-20 pl-2 relative xl:pb-20"
      >
        <div id="scroll_text" class="xl:!left-[-60px] xl:!bottom-[0px]">scroll</div>
        <span id="welcome_line"></span>
        <p>hey, I'm</p>
        <p class="name">Thanasis</p>
        <p class="name relative">
          Traitsis <span id="surname_underline"></span>
        </p>
      </div>
      <div class="ml-10 mb-8">
        <img id="welcome_img" src="../../../../public/images/home_image.png" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  #welcome_line {
    position: absolute;
    content: "";
    background: var(--primary-color);
    height: 100%;
    width: 1px;
    top: 0;
    left: 0;
    transform-origin: top;
  }

  #scroll_text {
    position: absolute;
    transform: rotate(-90deg);
    text-transform: uppercase;
    bottom: -20px;
    left: -50px;
    font-style: italic;
    font-weight: lighter;
    letter-spacing: 3px;
    font-size: calc(var(--small-header) * 0.8);
  }

  #surname_underline {
    position: absolute;
    content: "";
    background: var(--primary-color);
    height: 1px;
    width: 150%;
    bottom: 0;
    left: -30%;
    transform-origin: bottom right;
  }

  .welcome-text p {
    color: var(--primary-color);
    font-family: var(--highlight-font);
    font-size: calc(var(--welcome-text) * 0.8);
    line-height: 1;
    height: 100%;
  }

  .name {
    font-size: calc(var(--welcome-text) * 1.2) !important;
    font-weight: bold !important;
  }

  @media (min-width: 1280px) {
    .welcome-text::before {
      left: -10px;
      width: 2px;
    }

    #surname::before {
      height: 2px;
      width: 170%;
      bottom: -10px;
      left: -50%;
    }

    .welcome-text::after {
      bottom: -30px;
      left: -70px;
      font-size: calc(var(--small-header) * 0.9);
    }
  }
</style>
