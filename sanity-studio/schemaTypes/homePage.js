export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'SEO title for the home page',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'Main heading on the home page',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 2,
      description: 'Subheading or tagline below the main heading'
    },
    {
      name: 'careerStartDate',
      title: 'Career Start Date',
      type: 'date',
      description: 'When you started your career (used to calculate years of experience automatically)',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'imageWithAlt',
      description: 'Main image on the home page'
    },
    {
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      description: 'Select projects to feature on the home page',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      validation: Rule => Rule.max(6).warning('Showing more than 6 projects might clutter the page')
    },
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      description: 'Additional content sections',
      of: [{ type: 'block' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page'
      }
    }
  }
}
