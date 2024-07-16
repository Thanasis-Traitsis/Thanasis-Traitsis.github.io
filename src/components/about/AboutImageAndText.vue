<script setup>
  import aboutText from "./../../assets/json/about-content.json";
  import { onMounted } from "vue";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";
  gsap.registerPlugin(ScrollTrigger);

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const work = aboutText.aboutWork;
  const employed = work.working;

  onMounted(() => {
    const aboutImgAnimation = sessionStorage.getItem("aboutImgAnimation");

    if (!aboutImgAnimation) {

      let mm = gsap.matchMedia();

      mm.add("(max-width: 1279px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#about_img",
              start: "top 50%",
              end: "bottom 20%",
              scrub: false,
            },
          })
          .fromTo(
            "#about_img",
            { x: "-100vw" },
            { x: 0, duration: 1.5, delay: 1 }
          );
      });

      mm.add("(min-width: 1280px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#about_img",
              start: "top 60%",
              end: "bottom 20%",
              scrub: false,
            },
          })
          .fromTo(
            "#about_img",
            { x: "-100vw" },
            { x: 0, duration: 1.5,}
          );
      });

      sessionStorage.setItem("aboutImgAnimation", "true");
    }
  });
</script>

<template>
  <div class="section">
    <div class="grid grid-cols-1 md:grid-cols-2 md:gap-10 md:items-center">
      <div class="w-full row-start-1 row-end-2">
        <img
          id="about_img"
          class="w-full xl:max-w-[550px] xl:ml-auto"
          src="./../../../public/images/about_image.png"
          alt=""
        />
      </div>
      <div
        class="row-start-2 row-end-3 flex flex-col md:row-start-1 md:row-end-2 md:col-start-2"
      >
        <div class="italic-headline-text -ml-4">
          <p>Hello there,</p>
        </div>
        <div>
          <p class="paragraph-text">
            I'm {{ calculateAge("7/7/2000") }} years old, I live in Greece and I
            like to call myself a Flutter enthusiast and Frontend Software
            Developer, with a passion for mobile development. As a graduate of
            the Department of Information Technology and Electronic Systems
            Engineering at the International University of Greece (IHU), my
            expertise blossomed, cultivating a profound understanding of
            software development principles. The first time I saw the endless
            possibilities within applications, I knew this was the path for me.
            Now, after gaining some experience in the mobile development world,
            my goal is to leverage my skills and knowledge to develop innovative
            mobile solutions.
          </p>
          <p class="paragraph-text mt-4">
            I am also excited about sharing my knowledge and experiences in
            Flutter development through blogging. My aim is to assist developers
            in navigating the complexities of mobile app development by offering
            tutorials, tips, and insights from my own projects and challenges.
            If you believe that could be helpful to you, all my articles can be
            found on both
            <a href="https://dev.to/thanasistraitsis">DEV.to</a> and
            <a href="https://sudorealm.com/blog/profile/thanasis-traitsis"
              >Sudorealm</a
            >.
          </p>

          <p class="paragraph-text mt-4" v-if="employed">
            Currently, I’m a member of the {{ work.company }} team as a
            {{ work.workTitle }}.
          </p>
          <p class="paragraph-text mt-4" v-else>
            I am currently exploring new opportunities and am eager to apply my
            skills and expertise in a dynamic work environment. Open to exciting
            challenges, I am actively seeking new career opportunities where I
            can contribute and grow professionally.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .paragraph-text a {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
