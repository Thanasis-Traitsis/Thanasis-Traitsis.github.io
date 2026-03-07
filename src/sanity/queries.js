// Fetch all projects for listing page
export const projectsQuery = `
  *[_type == "project"] | order(order asc, date desc) {
    _id,
    title,
    slug,
    category,
    date,
    featured,
    shortDescription,
    "mainImage": images[0].image,
    "mainImageAlt": images[0].alt,
    techStack[] {
      name,
      icon
    }
  }
`

// Fetch single project by slug
export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    date,
    platformAvailability,
    privacyPolicy,
    techStack,
    credits,
    images,
    fullDescription,
    shortDescription,
    contentSections[] {
      heading,
      subheading,
      description,
      cards[] {
        icon,
        title,
        description
      }
    }
  }
`

// Fetch home page content
export const homePageQuery = `
  *[_type == "homePage"][0] {
    title,
    heroHeading,
    heroSubheading,
    careerStartDate,
    heroImage,
    content,
    "featuredProjects": featuredProjects[]-> {
      _id,
      title,
      slug,
      category,
      shortDescription,
      "mainImage": images[0].image,
      "mainImageAlt": images[0].alt
    }
  }
`

// Fetch about page content
export const aboutPageQuery = `
  *[_type == "aboutPage"][0] {
    title,
    birthDate,
    careerStartDate,
    profileImage,
    bio,
    workExperience[] {
      company,
      role,
      startDate,
      endDate,
      current
    }
  }
`

// Fetch contact page content
export const contactPageQuery = `
  *[_type == "contactPage"][0] {
    title,
    heading,
    description,
    email,
    socialLinks
  }
`

// Fetch social links
export const socialLinksQuery = `
  *[_type == "socialLinks"][0] {
    email,
    github,
    linkedin,
    devto,
    twitter
  }
`

// Fetch project privacy policy by slug
export const projectPrivacyPolicyQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    privacyPolicy
  }
`
