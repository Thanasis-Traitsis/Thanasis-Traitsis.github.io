<script setup>
  import projectsData from "./../../assets/json/projects-content.json";
  import AboutProjectCard from "./AboutProjectCard.vue";

  const projectsList = projectsData.projectsList;
</script>

<template>
  <div class="section">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 xl:gap-10 xl:items-start">
      <div class="row-start-1 row-end-2 md:col-span-2 xl:col-span-1">
        <p class="paragraph-text">
          Let me highlight two of my favourite projects. Each project represents
          a culmination of creativity, technical expertise, and a deep passion
          for innovation.
        </p>
      </div>
      <div
        class="row-start-2 row-end-3 col-start-1 col-end-2 md:col-end-3 md:grid md:grid-cols-2 md:gap-10 xl:row-start-1 xl:row-end-2 xl:col-start-2 xl:col-span-2 xl:items-start"
      >
        <div v-for="project in projectsList" :key="project.id">
          <AboutProjectCard
            v-if="project.aboutSelected"
            :imageSrc="project.projectCardImage"
            :route="`/projects/${project.id}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>
