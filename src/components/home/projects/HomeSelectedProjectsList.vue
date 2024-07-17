<script setup>
  import projectsData from "../../../../public/assets/json/projects-content.json";
  import ProjectListItem from "./../../ProjectListItem.vue";

  const projectsList = projectsData.projectsList;
</script>
<template>
  <div>
    <div v-for="project in projectsList" :key="project.id">
      <ProjectListItem
        v-if="project.homeSelected"
        :id="project.id"
        :title="project.projectTitle"
        :category="project.projectCategory"
        :date="project.projectDate"
        :isWhite="true"
      />
    </div>
  </div>
</template>
