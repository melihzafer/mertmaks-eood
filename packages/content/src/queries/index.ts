export const contentTags = {
  siteSettings: "site-settings",
  navigation: "navigation",
  stores: "stores",
  home: "home",
  contact: "contact",
  restaurant: "restaurant",
  divisions: "divisions",
  promotions: "promotions",
  products: "products",
  faqs: "faqs",
} as const;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

export const navigationQuery = `*[_type == "navigationItem" && visible == true] | order(placement asc, order asc, label asc)`;

export const storesQuery = `*[_type == "store"] | order(name asc)`;

export const homePageQuery = `*[_type == "homePage"][0]{
  ...,
  featuredPromotions[]->{
    ...,
    store->,
    category->
  }
}`;

export const contactPageQuery = `{
  "page": *[_type == "contactPage"][0],
  "stores": *[_type == "store"] | order(name asc)
}`;

export const divisionPageByStoreQuery = `*[_type == "divisionPage" && store->slug.current == $slug][0]{
  ...,
  store->
}`;

export const restaurantPageQuery = `*[_type == "restaurantPage"][0]`;

export const featuredPromotionsQuery = `*[
  _type == "promotion" &&
  active == true &&
  featured == true &&
  (!defined(validFrom) || validFrom <= $today) &&
  (!defined(validTo) || validTo >= $today)
] | order(order asc, validTo asc){
  ...,
  store->,
  category->,
  products[]->
}`;

export const searchIndexQuery = `{
  "products": *[_type == "product" && visible == true]{
    _id,
    title,
    description,
    keywords,
    "category": category->title,
    "store": store->slug.current,
    "link": "/" + store->slug.current
  },
  "faqs": *[_type == "faq" && visible == true]{
    _id,
    question,
    answer,
    keywords,
    link
  }
}`;
