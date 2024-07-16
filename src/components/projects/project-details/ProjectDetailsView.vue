<script setup>
  import projectsData from "./../../../assets/json/projects-content.json";
  import ProjectTitle from "./ProjectTitle.vue";
  import ProjectDetailsContainer from "./ProjectDetailsContainer.vue";
  import ProjectBannerContainer from "./ProjectBannerContainer.vue";
  import ProjectPhoneImages from "./ProjectPhoneImages.vue";
  import NextProjectSection from "./NextProjectSection.vue";

  import { useRoute } from "vue-router";
  import { watch } from "vue";

  const route = useRoute();

  let projectId = route.params.projectId;
  let project = projectsData.projectsList.find(
    (project) => project.id === projectId
  );

  // Filter out the project with the specified projectId
  let filteredProjects = projectsData.projectsList.filter(
    (proj) => proj.id !== projectId
  );

  // Get a random project ID from the filtered projects
  let randomProjectIndex = Math.floor(Math.random() * filteredProjects.length);
  let randomId = filteredProjects[randomProjectIndex].id;

  // Watch for changes to the route parameter 'projectId'
  watch(
    () => route.params.projectId,
    (newId, oldId) => {
      // Update projectId
      projectId = newId;

      // Update project with the project corresponding to the new projectId
      project = projectsData.projectsList.find((proj) => proj.id === newId);

      filteredProjects = projectsData.projectsList.filter(
        (proj) => proj.id !== projectId
      );

      // Update the random project ID from the filtered projects
      randomProjectIndex = Math.floor(Math.random() * filteredProjects.length);
      randomId = filteredProjects[randomProjectIndex].id;
    }
  );
</script>

<template>
  <div v-if="project">
    <ProjectTitle :title="project.projectTitle" />
    <ProjectDetailsContainer
      :title="project.projectTitle"
      :year="project.projectDate"
      :category="project.projectCategory"
      :isAvailable="project.isAvailable"
      :techList="project.projectTech"
      :credits="project.projectCredits"
      :description="project.projectDescription"
    />
    <ProjectBannerContainer
      :bannerImage="project.projectCardImage"
      :bannerImageBig="project.projectCardImageBig"
    />
    <ProjectPhoneImages :phoneImages="project.projectPhoneImages" />
  </div>
  <div v-else>
    <p>Project not found</p>
  </div>
  <NextProjectSection :route="randomId" />
</template>
