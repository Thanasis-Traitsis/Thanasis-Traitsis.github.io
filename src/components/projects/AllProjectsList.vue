<script setup>
  import projectsData from "./../../../public/assets/json/projects-content.json";
  import ProjectListItem from "../ProjectListItem.vue";

  const projectsList = projectsData.projectsList;
</script>

<template>
  <div class="section">
    <div class="flex flex-col xl:grid xl:gap-x-4 xl:grid-cols-[repeat(2,_1fr)_250px]">
      <div class="project-details xl:col-start-1 xl:row-start-1">
        <p>title</p>
      </div>
      <div class="project-title-underline xl:row-start-2 xl:col-span-2"></div>
      <div class="flex flex-row justify-between xl:col-start-2 xl:col-span-1 xl:row-start-1">
        <div class="project-details xl:-ml-4">
          <p>category</p>
        </div>
        <div class="project-details">
          <p>year</p>
        </div>
      </div>
    </div>
    <div v-for="project in projectsList" :key="project.id">
      <ProjectListItem
        :id="project.id"
        :title="project.projectTitle"
        :category="project.projectCategory"
        :date="project.projectDate"
        :isWhite="false"
      />
    </div>
  </div>
</template>

<style scoped>
  .project-title-underline {
    background: var(--primary-color);
    width: 100%;
    height: 1px;
    margin: 0.4em 0;
  }
</style>
