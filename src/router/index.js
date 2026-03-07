import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'
import ProjectDetailsView from '@/components/projects/project-details/ProjectDetailsView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import AppAdsTxtView from '@/views/AppAdsTxtView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top on route change
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home - Thanasis Traitsis',
        requiresSanity: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About - Thanasis Traitsis',
        requiresSanity: true
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: {
        title: 'Projects - Thanasis Traitsis',
        requiresSanity: true
      }
    },
    {
      path: '/projects/:projectId/privacy-policy',
      name: 'project-privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        title: 'Privacy Policy',
        requiresSanity: true
      }
    },
    {
      path: '/projects/:projectId/app-ads.txt',
      name: 'project-app-ads',
      component: AppAdsTxtView,
      meta: {
        title: 'app-ads.txt',
        requiresSanity: false
      }
    },
    {
      path: '/projects/:projectId',
      name: 'project-details',
      component: ProjectDetailsView,
      meta: {
        title: 'Project Details - Thanasis Traitsis',
        requiresSanity: true
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {
        title: 'Contact - Thanasis Traitsis',
        requiresSanity: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: '404 - Page Not Found',
        requiresSanity: false
      }
    }
  ]
})

// Navigation guard for page titles
router.afterEach((to) => {
  document.title = to.meta.title || 'Thanasis Traitsis - Portfolio'
})

export default router
