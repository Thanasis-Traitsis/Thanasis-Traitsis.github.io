# Implementation Plan: Portfolio Rebuild with Sanity CMS

## Overview

This implementation plan breaks down the portfolio rebuild into discrete coding tasks. The approach follows a bottom-up strategy: start with Sanity CMS setup and schema definitions, then build the Vue application infrastructure, integrate Sanity data fetching, implement components and views, and finally add testing and deployment configuration.

The implementation uses Vue 3 with Composition API, Vite, Tailwind CSS, and Sanity.io, deployed on Vercel.

## Tasks

- [x] 1. Set up Sanity CMS project and schemas
  - [x] 1.1 Initialize Sanity project and configure studio
    - Create new Sanity project using `sanity init`
    - Configure `sanity.config.js` with project ID and dataset
    - Set up development and production datasets
    - _Requirements: 3.1, 3.2, 7.1, 9.1_

  - [x] 1.2 Create Sanity schema object types
    - Implement `platformLink.js` schema for platform availability
    - Implement `techStackItem.js` schema for tech stack items
    - Implement `imageWithAlt.js` schema for images with alt text
    - _Requirements: 9.5, 9.6, 9.8_

  - [x] 1.3 Create Project document schema
    - Implement `project.js` schema with all required fields (title, slug, category, date, featured, platformAvailability, techStack, credits, images, shortDescription, fullDescription, order)
    - Add validation rules for required fields
    - Configure preview and orderings
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9_

  - [x] 1.4 Create page content schemas
    - Implement `homePage.js` schema with hero content and featured projects
    - Implement `aboutPage.js` schema with bio, skills, and experience
    - Implement `contactPage.js` schema with contact information and social links
    - _Requirements: 3.2, 9.10_

  - [x] 1.5 Register schemas and deploy Sanity Studio
    - Create `schemas/index.js` to register all schemas
    - Deploy Sanity Studio using `sanity deploy`
    - Verify Studio is accessible and schemas are correct
    - _Requirements: 3.1, 4.4, 4.5, 4.6_

  - [x]* 1.6 Populate Sanity with initial test content
    - Create 3-5 sample projects with complete data
    - Create content for all page schemas
    - Upload sample images
    - _Requirements: 3.1, 10.1, 10.2_

- [x] 2. Checkpoint - Verify Sanity setup
  - Ensure Sanity Studio is accessible and all schemas work correctly. Verify you can create, edit, and delete projects. Ask the user if questions arise.

- [x] 3. Set up Vue project infrastructure
  - [x] 3.1 Create new Vue 3 project with Vite
    - Initialize project using `npm create vue@latest`
    - Select Vue 3, Vue Router, no TypeScript, no JSX
    - Install dependencies
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 8.1_

  - [x] 3.2 Install and configure Tailwind CSS
    - Install Tailwind CSS and dependencies
    - Create `tailwind.config.js` with content paths
    - Add Tailwind directives to `src/index.css`
    - Configure color scheme and typography to match existing portfolio
    - _Requirements: 5.1, 5.2, 5.3, 6.1, 6.2, 6.3_

  - [x] 3.3 Install Sanity client dependencies
    - Install `@sanity/client` and `@sanity/image-url`
    - Install `fast-check` for property-based testing
    - Install `vitest` and `@vue/test-utils` for unit testing
    - _Requirements: 7.1_

  - [x] 3.4 Configure environment variables
    - Create `.env.example` template
    - Create `.env.local` with Sanity project ID and dataset
    - Create `.env.development` and `.env.production` files
    - Add environment variable validation in `src/config/env.js`
    - _Requirements: 7.1, 8.4_

  - [x] 3.5 Configure Vite build optimization
    - Update `vite.config.js` with manual chunks for vendor and Sanity code
    - Configure path aliases
    - Set chunk size warning limit
    - _Requirements: 8.2, 8.3_

- [x] 4. Create Sanity integration layer
  - [x] 4.1 Implement Sanity client configuration
    - Create `src/sanity/client.js` with Sanity client setup
    - Configure project ID, dataset, CDN usage, and API version from environment variables
    - _Requirements: 7.1, 7.4_

  - [x] 4.2 Implement image URL builder
    - Create `src/sanity/imageBuilder.js` with `urlFor` function
    - Create image presets (thumbnail, card, hero, detail, responsive)
    - _Requirements: 10.3, 10.4_

  - [x] 4.3 Define GROQ queries
    - Create `src/sanity/queries.js` with all required queries
    - Implement `projectsQuery` for project listing
    - Implement `projectBySlugQuery` for single project
    - Implement `homePageQuery`, `aboutPageQuery`, `contactPageQuery`
    - _Requirements: 3.4, 7.2_

  - [x] 4.4 Create data fetching composable
    - Implement `src/composables/useSanityData.js` with loading, error, and data states
    - Add `fetchData` function with error handling
    - Add `refetch` capability
    - _Requirements: 7.2, 7.3, 7.4_

  - [ ]* 4.5 Write unit tests for Sanity client configuration
    - Test client initialization with valid environment variables
    - Test CDN mode is enabled
    - Test error thrown when environment variables are missing
    - _Requirements: 7.1_

  - [ ]* 4.6 Write unit tests for image URL builder
    - Test image URL generation with valid image reference
    - Test URL includes project ID and dataset
    - Test handling of null/undefined image references
    - _Requirements: 10.3_

- [x] 5. Implement routing and navigation
  - [x] 5.1 Configure Vue Router
    - Create `src/router/index.js` with all routes
    - Define routes for Home (/), About (/about), Projects (/projects), Contact (/contact)
    - Define dynamic route for project details (/projects/:projectId)
    - Add Privacy Policy route (/projects/find-the-words/privacy-policy)
    - Add 404 Not Found route
    - Configure scroll behavior to top on route change
    - Add navigation guard for page titles
    - _Requirements: 1.5, 2.1_

  - [ ]* 5.2 Write unit tests for route configuration
    - Test all main routes are defined
    - Test dynamic project route pattern exists
    - Test 404 handling for invalid routes
    - _Requirements: 1.5, 2.1_

  - [ ]* 5.3 Write property test for Navigation Completeness
    - **Property 1: Navigation Completeness**
    - **Validates: Requirements 1.5**
    - Test that navigating between any pair of main pages successfully routes and renders
    - Run 100+ iterations with all page combinations
    - _Requirements: 1.5_

- [-] 6. Create common components
  - [x] 6.1 Implement LoadingSpinner component
    - Create `src/components/common/LoadingSpinner.vue`
    - Add spinner animation with Tailwind CSS
    - _Requirements: 7.2_

  - [x] 6.2 Implement ErrorMessage component
    - Create `src/components/common/ErrorMessage.vue`
    - Accept error message and retry callback as props
    - Display user-friendly error message with retry button
    - _Requirements: 7.3_

  - [ ] 6.3 Implement ResponsiveImage component
    - Create `src/components/common/ResponsiveImage.vue`
    - Generate srcset with multiple widths (400, 800, 1200, 1600, 2000)
    - Support lazy/eager loading
    - Add error handling with placeholder fallback
    - _Requirements: 10.3, 10.4, 5.1, 5.2, 5.3_

  - [ ] 6.4 Implement ImageGallery component
    - Create `src/components/common/ImageGallery.vue`
    - Display main image with thumbnail navigation
    - Use ResponsiveImage for main image
    - Optimize thumbnails with small dimensions
    - _Requirements: 10.2, 10.3, 10.4_

  - [ ] 6.5 Implement PortableText component
    - Create `src/components/sanity/PortableText.vue`
    - Render Sanity portable text blocks
    - Handle text blocks, images, and basic formatting
    - Add error handling for unsupported block types
    - _Requirements: 9.9, 7.4_

  - [ ]* 6.6 Write unit tests for error handling
    - Test error message displays when Sanity is unreachable
    - Test retry functionality after fetch error
    - Test image error handling with placeholder fallback
    - _Requirements: 7.3_

- [ ] 7. Checkpoint - Verify infrastructure
  - Ensure all common components render correctly. Test Sanity client can fetch data. Verify routing works. Ask the user if questions arise.

- [ ] 8. Implement project components
  - [ ] 8.1 Implement ProjectCard component
    - Create `src/components/projects/ProjectCard.vue`
    - Display project thumbnail, title, category, and short description
    - Use ResponsiveImage with card preset
    - Add click handler to navigate to project details
    - Style with Tailwind CSS matching existing design
    - _Requirements: 2.1, 2.2, 6.1, 6.2, 6.3_

  - [ ] 8.2 Implement ProjectGrid component
    - Create `src/components/projects/ProjectGrid.vue`
    - Display projects in responsive grid layout
    - Use ProjectCard for each project
    - Handle empty state when no projects exist
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 8.3 Implement ProjectDetailsView component
    - Create `src/components/projects/project-details/ProjectDetailsView.vue`
    - Fetch project data using `useSanityData` and `projectBySlugQuery`
    - Display all project fields: title, category, date, platform availability, tech stack, credits, images, descriptions
    - Use ImageGallery for project images
    - Use PortableText for full description
    - Handle loading and error states
    - Handle project not found (404)
    - _Requirements: 2.1, 2.2, 2.3, 3.3, 7.2, 7.3_

  - [ ]* 8.4 Write property test for Dynamic Project Routing
    - **Property 2: Dynamic Project Routing**
    - **Validates: Requirements 2.1**
    - Test that clicking any project with valid slug routes to correct detail page
    - Run 100+ iterations with randomly generated project slugs
    - _Requirements: 2.1_

  - [ ]* 8.5 Write property test for Project Field Completeness
    - **Property 3: Project Field Completeness**
    - **Validates: Requirements 2.2**
    - Test that all required project fields appear in rendered detail page
    - Run 100+ iterations with randomly generated project data
    - _Requirements: 2.2_

- [-] 9. Implement page views
  - [x] 9.1 Implement HomeView
    - Create `src/views/HomeView.vue`
    - Fetch home page content using `useSanityData` and `homePageQuery`
    - Display hero section with heading, subheading, and image
    - Display featured projects using ProjectGrid
    - Handle loading and error states
    - _Requirements: 1.1, 3.2, 3.3, 3.4, 7.2_

  - [ ] 9.2 Implement AboutView
    - Create `src/views/AboutView.vue`
    - Fetch about page content using `useSanityData` and `aboutPageQuery`
    - Display profile image, bio, skills, and experience
    - Use PortableText for bio and experience
    - Handle loading and error states
    - _Requirements: 1.2, 3.2, 3.3, 3.4, 7.2_

  - [ ] 9.3 Implement ProjectsView
    - Create `src/views/ProjectsView.vue`
    - Fetch all projects using `useSanityData` and `projectsQuery`
    - Display projects using ProjectGrid
    - Handle loading and error states
    - _Requirements: 1.3, 3.2, 3.3, 3.4, 7.2_

  - [ ] 9.4 Implement ContactView
    - Create `src/views/ContactView.vue`
    - Fetch contact page content using `useSanityData` and `contactPageQuery`
    - Display heading, description, email, and social links
    - Handle loading and error states
    - _Requirements: 1.4, 3.2, 3.3, 3.4, 7.2_

  - [ ] 9.5 Implement NavbarView
    - Create `src/views/NavbarView.vue`
    - Add navigation links to all main pages
    - Highlight active route
    - Make responsive for mobile, tablet, desktop
    - _Requirements: 1.5, 5.1, 5.2, 5.3_

  - [ ] 9.6 Create NotFoundView for 404 errors
    - Create `src/views/NotFoundView.vue`
    - Display 404 message
    - Provide link back to home page
    - _Requirements: 1.5_

  - [ ] 9.7 Keep existing PrivacyPolicyView
    - Copy `PrivacyPolicyView.vue` from old project
    - Ensure it works with new routing
    - _Requirements: 1.5_

  - [ ]* 9.8 Write property test for Content Fetching on Mount
    - **Property 5: Content Fetching on Mount**
    - **Validates: Requirements 3.4, 7.2**
    - Test that any page component initiates fetch on mount and populates with data
    - Run 100+ iterations across all page components
    - _Requirements: 3.4, 7.2_

  - [ ]* 9.9 Write property test for Content Parsing Correctness
    - **Property 6: Content Parsing Correctness**
    - **Validates: Requirements 7.4**
    - Test that any valid Sanity API response is correctly parsed without data loss
    - Run 100+ iterations with randomly generated API responses
    - _Requirements: 7.4_

- [ ] 10. Implement App.vue and main.js
  - [ ] 10.1 Update App.vue
    - Add NavbarView component
    - Add router-view with fade transition
    - Apply global layout styles
    - _Requirements: 1.5, 5.4, 5.5_

  - [ ] 10.2 Update main.js
    - Import and validate environment variables
    - Mount Vue app with router
    - Import global styles
    - Add error handling for missing environment variables
    - _Requirements: 7.1, 8.4_

  - [ ] 10.3 Update index.css with global styles
    - Import Tailwind directives
    - Add custom fonts (Mulish, Playfair Display)
    - Add global typography styles matching existing portfolio
    - Add transition styles
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]* 10.4 Write unit tests for responsive breakpoints
    - Test layout adapts at mobile breakpoint (< 768px)
    - Test layout adapts at tablet breakpoint (768px - 1024px)
    - Test layout adapts at desktop breakpoint (> 1024px)
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 10.5 Write unit tests for typography
    - Test Mulish font is loaded and applied
    - Test Playfair Display font is loaded and applied
    - _Requirements: 6.2_

- [ ] 11. Checkpoint - Verify all pages work
  - Ensure all pages load correctly with Sanity data. Test navigation between pages. Verify responsive design. Ask the user if questions arise.

- [ ] 12. Implement property-based tests for data synchronization
  - [ ]* 12.1 Write property test for Data Synchronization
    - **Property 4: Data Synchronization**
    - **Validates: Requirements 3.3, 4.1, 4.3**
    - Test that changes to CMS content (add/update/delete) are reflected after refetch
    - Run 100+ iterations with different operations
    - _Requirements: 3.3, 4.1, 4.3_

  - [ ]* 12.2 Write property test for Image URL Generation
    - **Property 7: Image URL Generation**
    - **Validates: Requirements 10.3**
    - Test that any Sanity image reference generates valid, accessible URL
    - Run 100+ iterations with randomly generated image references
    - _Requirements: 10.3_

  - [ ]* 12.3 Write property test for Image Optimization Parameters
    - **Property 8: Image Optimization Parameters**
    - **Validates: Requirements 10.4**
    - Test that generated image URLs include optimization parameters
    - Run 100+ iterations with different image references and dimensions
    - _Requirements: 10.4_

- [ ] 13. Configure deployment
  - [ ] 13.1 Create vercel.json configuration
    - Configure build command, output directory, framework
    - Add rewrites for SPA routing
    - Add cache headers for static assets
    - Add security headers
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ] 13.2 Configure Vercel environment variables
    - Document required environment variables in README
    - Set up environment variables in Vercel dashboard (production and preview)
    - Test deployment with correct environment variables
    - _Requirements: 8.4_

  - [ ] 13.3 Create deployment documentation
    - Document deployment process in README
    - Document environment variable setup
    - Document Sanity Studio deployment process
    - Document rollback procedure
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 14. Final testing and verification
  - [ ]* 14.1 Run all unit tests
    - Execute `npm run test:unit`
    - Verify all unit tests pass
    - Check code coverage meets 80%+ for utilities and composables
    - _Requirements: All_

  - [ ]* 14.2 Run all property-based tests
    - Execute `npm run test:property`
    - Verify all property tests pass with 100+ iterations
    - Verify all 8 correctness properties are validated
    - _Requirements: All_

  - [ ]* 14.3 Manual testing across devices
    - Test on mobile device (iOS or Android)
    - Test on tablet device
    - Test on desktop browser
    - Verify responsive design works correctly
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 14.4 Accessibility audit
    - Run Lighthouse accessibility audit
    - Verify all images have alt text
    - Verify keyboard navigation works
    - Verify color contrast meets WCAG standards
    - _Requirements: 5.4, 5.5, 10.3_

  - [ ]* 14.5 Performance testing
    - Run Lighthouse performance audit
    - Verify LCP < 2.5s
    - Verify FID < 100ms
    - Verify CLS < 0.1
    - Test image optimization is working
    - _Requirements: 8.3, 10.4_

- [ ] 15. Final checkpoint - Production readiness
  - Ensure all tests pass, deployment is configured, and application is ready for production. Ask the user if questions arise before deploying.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Property-based tests must run at least 100 iterations each
- Checkpoints ensure incremental validation and provide opportunities for user feedback
- The implementation follows a bottom-up approach: infrastructure first, then components, then integration
- All code should be written in JavaScript (Vue 3 with Composition API)
- Testing uses Vitest for unit tests and fast-check for property-based tests
