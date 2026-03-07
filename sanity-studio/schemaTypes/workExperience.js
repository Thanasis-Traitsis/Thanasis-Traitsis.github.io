export default {
  name: 'workExperience',
  title: 'Work Experience',
  type: 'object',
  fields: [
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if currently working here'
    },
    {
      name: 'current',
      title: 'Currently Working Here',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      company: 'company',
      role: 'role',
      startDate: 'startDate',
      endDate: 'endDate',
      current: 'current'
    },
    prepare(selection) {
      const {company, role, startDate, endDate, current} = selection
      const start = new Date(startDate).getFullYear()
      const end = current ? 'Present' : new Date(endDate).getFullYear()
      return {
        title: `${role} at ${company}`,
        subtitle: `${start} - ${end}`
      }
    }
  }
}
