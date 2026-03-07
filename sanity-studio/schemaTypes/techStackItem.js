export default {
  name: 'techStackItem',
  title: 'Tech Stack Item',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Technology Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Optional icon for the technology'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'icon'
    }
  }
}
