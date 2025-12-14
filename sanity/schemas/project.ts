import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'content',
      title: 'Project Content',
      type: 'array',
      of: [{ type: 'block' }], // rich text
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],
})
