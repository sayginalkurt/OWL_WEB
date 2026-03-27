import { client } from "./client";

// Fetch a product by its key (fwbm or fuzzyowl)
export async function getProduct(productKey: string, locale: string) {
  return client.fetch(
    `*[_type == "product" && productKey == $productKey][0]{
      "title": title[$locale],
      "description": description[$locale],
      "modules": modules[]{"name": name[$locale], "body": body[$locale]},
      slug, images, pricing, productKey, seo, _updatedAt
    }`,
    { productKey, locale }
  );
}

// Fetch all solutions
export async function getSolutions(locale: string) {
  return client.fetch(
    `*[_type == "solution"] | order(order asc) {
      "title": title[$locale],
      "body": body[$locale],
      slug, icon, relatedProducts[]->{ productKey, "title": title[$locale] }, seo, _updatedAt
    }`,
    { locale }
  );
}

// Fetch insights with optional filters
export async function getInsights(
  locale: string,
  category?: string,
  tag?: string
) {
  const filters = ['_type == "insight"'];
  if (category) filters.push("category == $category");
  if (tag) filters.push("$tag in tags");

  const filter = filters.join(" && ");

  const query: string = `*[${filter}] | order(publishedAt desc) {
    "title": title[$locale],
    "excerpt": excerpt[$locale],
    slug, category, tags, publishedAt, seo, _updatedAt,
    "author": author->{ name, "role": role[$locale], image }
  }`;

  const params: Record<string, unknown> = {
    locale,
    ...(category ? { category } : {}),
    ...(tag ? { tag } : {}),
  };

  return client.fetch(query, params);
}

// Fetch a single insight by slug
export async function getInsight(slug: string, locale: string) {
  return client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{
      "title": title[$locale],
      "body": body[$locale],
      "excerpt": excerpt[$locale],
      slug, category, tags, publishedAt, seo, _updatedAt,
      "author": author->{ name, "role": role[$locale], image }
    }`,
    { slug, locale }
  );
}

// Fetch all founders
export async function getFounders(locale: string) {
  return client.fetch(
    `*[_type == "founder"] | order(order asc) {
      name, image, social,
      "role": role[$locale],
      "bio": bio[$locale]
    }`,
    { locale }
  );
}

// Fetch partners/investors
export async function getPartners(locale: string) {
  return client.fetch(
    `*[_type == "partner"] | order(name asc) {
      name, logo, url,
      "description": description[$locale]
    }`,
    { locale }
  );
}

// Fetch a generic page by slug
export async function getPage(slug: string, locale: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      "title": title[$locale],
      "body": body[$locale],
      slug, seo, _updatedAt
    }`,
    { slug, locale }
  );
}

// Fetch FAQs, optionally by product
export async function getFaqs(locale: string, productKey?: string) {
  const filters = ['_type == "faq"'];
  if (productKey)
    filters.push("relatedProduct->productKey == $productKey");

  const filter = filters.join(" && ");

  const query: string = `*[${filter}] | order(order asc) {
    "question": question[$locale],
    "answer": answer[$locale],
    category
  }`;

  const params: Record<string, unknown> = {
    locale,
    ...(productKey ? { productKey } : {}),
  };

  return client.fetch(query, params);
}
