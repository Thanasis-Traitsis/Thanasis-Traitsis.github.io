export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'SEO title for the about page',
      validation: Rule => Rule.required()
    },
    {
      name: 'birthDate',
      title: 'Birth Date',
      type: 'date',
      description: 'Your date of birth (used to calculate age automatically)',
      validation: Rule => Rule.required()
    },
    {
      name: 'careerStartDate',
      title: 'Career Start Date',
      type: 'date',
      description: 'When you started your career (used to calculate years of experience automatically)',
      validation: Rule => Rule.required()
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'imageWithAlt',
      description: 'Your photo or avatar'
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'array',
      description: 'Tell your story',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              }
            ]
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'workExperience',
      title: 'Work Experience',
      type: 'array',
      description: 'Your work history (ordered from most recent to oldest)',
      of: [{ type: 'workExperience' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page'
      }
    }
  }
}
