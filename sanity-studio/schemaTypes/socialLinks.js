export default {
  name: 'socialLinks',
  title: 'Social Links',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title (e.g., "Social Links Configuration")',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
      description: 'Full GitHub profile URL (e.g., https://github.com/username)'
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Full LinkedIn profile URL (e.g., https://linkedin.com/in/username)'
    },
    {
      name: 'devto',
      title: 'Dev.to URL',
      type: 'url',
      description: 'Full Dev.to profile URL (e.g., https://dev.to/username)'
    },
    {
      name: 'twitter',
      title: 'Twitter/X URL',
      type: 'url',
      description: 'Full Twitter/X profile URL (optional)'
    }
  ],
  preview: {
    select: {
      title: 'title',
      email: 'email'
    },
    prepare(selection) {
      const {title, email} = selection
      return {
        title: title,
        subtitle: email
      }
    }
  }
}
