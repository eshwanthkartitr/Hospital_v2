export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'technologies',
        title: 'Technologies',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
      },
      {
        name: 'link',
        title: 'Link',
        type: 'url',
      },
      {
        name: 'featured',
        title: 'Featured',
        type: 'boolean',
      },
    ],
  }