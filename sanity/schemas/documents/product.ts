import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "productKey",
      title: "Product Key",
      type: "string",
      options: {
        list: [
          { title: "FWBM", value: "fwbm" },
          { title: "FuzzyOwl", value: "fuzzyowl" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "productKey" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedBlock",
    }),
    defineField({
      name: "modules",
      title: "Modules",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "localizedString", title: "Module Name" },
            { name: "body", type: "localizedBlock", title: "Module Description" },
            { name: "icon", type: "string", title: "Icon Key" },
          ],
        },
      ],
    }),
    defineField({
      name: "useCases",
      title: "Use Cases",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "sector", type: "localizedString", title: "Sector" },
            { name: "description", type: "localizedBlock", title: "Description" },
          ],
        },
      ],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "productKey" },
  },
});
