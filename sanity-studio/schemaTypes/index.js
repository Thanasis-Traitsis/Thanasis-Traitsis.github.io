import platformLink from './platformLink'
import techStackItem from './techStackItem'
import imageWithAlt from './imageWithAlt'
import project from './project'
import homePage from './homePage'
import aboutPage from './aboutPage'
import contactPage from './contactPage'
import socialLinks from './socialLinks'
import workExperience from './workExperience'

export const schemaTypes = [
  // Document types (main content)
  project,
  homePage,
  aboutPage,
  contactPage,
  socialLinks,
  
  // Object types (reusable components)
  platformLink,
  techStackItem,
  imageWithAlt,
  workExperience,
]
