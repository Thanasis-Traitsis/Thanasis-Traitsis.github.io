export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of your project',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title (e.g., "my-awesome-app")',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Cross-Platform', value: 'cross-platform' },
          { title: 'Native', value: 'native' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Project Date',
      type: 'date',
      description: 'When was this project completed?',
      validation: Rule => Rule.required()
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Display this project prominently on the home page',
      initialValue: false
    },
    {
      name: 'platformAvailability',
      title: 'Platform Availability',
      type: 'array',
      description: 'Where can people find this project? (App Store, Play Store, etc.)',
      of: [{ type: 'platformLink' }]
    },
    {
      name: 'privacyPolicyUrl',
      title: 'Privacy Policy URL',
      type: 'url',
      description: 'Link to the privacy policy page (if applicable)'
    },
    {
      name: 'privacyPolicy',
      title: 'Privacy Policy Content',
      type: 'array',
      description: 'Privacy policy content (will be displayed at /projects/[slug]/privacy-policy)',
      of: [
        { 
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' }
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
      ]
    },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      description: 'Technologies used in this project',
      of: [{ type: 'techStackItem' }]
    },
    {
      name: 'credits',
      title: 'Credits',
      type: 'text',
      rows: 3,
      description: 'Acknowledge collaborators or contributors'
    },
    {
      name: 'images',
      title: 'Project Images',
      type: 'array',
      description: 'Screenshots or photos of your project',
      of: [{ type: 'imageWithAlt' }],
      validation: Rule => Rule.required().min(1).error('At least one image is required')
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for project cards (max 200 characters)',
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      description: 'Detailed project description with rich text formatting',
      of: [
        { 
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
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
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
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
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: Rule => Rule.required()
            }
          ]
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      description: 'Additional content sections (features, updates, etc.) displayed between description and gallery',
      of: [
        {
          type: 'object',
          name: 'contentSection',
          title: 'Content Section',
          fields: [
            {
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
              description: 'Main heading for this section (e.g., "Everything the Latest Update Brings")',
              validation: Rule => Rule.required()
            },
            {
              name: 'subheading',
              title: 'Section Subheading',
              type: 'string',
              description: 'Optional subheading or label (e.g., "NEW IN THIS VERSION")'
            },
            {
              name: 'description',
              title: 'Section Description',
              type: 'text',
              rows: 3,
              description: 'Optional description text below the heading'
            },
            {
              name: 'cards',
              title: 'Cards',
              type: 'array',
              description: 'Feature cards or content items',
              of: [
                {
                  type: 'object',
                  name: 'card',
                  title: 'Card',
                  fields: [
                    {
                      name: 'icon',
                      title: 'Icon/Image',
                      type: 'image',
                      description: 'Optional icon or image for the card'
                    },
                    {
                      name: 'title',
                      title: 'Card Title',
                      type: 'string',
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'description',
                      title: 'Card Description',
                      type: 'text',
                      rows: 3,
                      validation: Rule => Rule.required()
                    }
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'description',
                      media: 'icon'
                    }
                  }
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'subheading'
            }
          }
        }
      ]
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (0, 1, 2, etc.)',
      initialValue: 0
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'images.0.image'
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category,
        media
      }
    }
  }
}
