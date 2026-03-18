import { defineType, defineField } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "localizedBlock",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "FWBM", value: "fwbm" },
          { title: "FuzzyOwl", value: "fuzzyowl" },
          { title: "Technical", value: "technical" },
        ],
      },
    }),
    defineField({
      name: "relatedProduct",
      title: "Related Product",
      type: "reference",
      to: [{ type: "product" }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "question.en", subtitle: "category" },
  },
});
