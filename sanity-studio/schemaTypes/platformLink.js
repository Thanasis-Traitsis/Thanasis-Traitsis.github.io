export default {
  name: 'platformLink',
  title: 'Platform Link',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'iOS App Store', value: 'ios' },
          { title: 'Android Play Store', value: 'android' },
          { title: 'Web', value: 'web' },
          { title: 'GitHub', value: 'github' }
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
