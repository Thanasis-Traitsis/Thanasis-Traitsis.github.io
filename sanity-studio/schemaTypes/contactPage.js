export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'SEO title for the contact page',
      validation: Rule => Rule.required()
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading on the contact page',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description or call-to-action'
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Your contact email',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Your social media profiles',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Other', value: 'other' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url'
            },
            prepare({ platform, url }) {
              return {
                title: platform,
                subtitle: url
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page'
      }
    }
  }
}
