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

export const storeCommercePageQuery = `{
  "page": *[_type == "divisionPage" && store->slug.current == $slug][0]{
    ...,
    store->
  },
  "store": *[_type == "store" && slug.current == $slug][0],
  "promotions": *[
    _type == "promotion" &&
    active == true &&
    store->slug.current == $slug &&
    (!defined(validFrom) || validFrom <= $today) &&
    (!defined(validTo) || validTo >= $today)
  ] | order(order asc, validTo asc){
    _id,
    title,
    description,
    label,
    discount,
    validFrom,
    validTo,
    terms,
    image,
    shareTitle,
    shareDescription,
    shareImage,
    brochureAccent,
    store->{
      _id,
      name,
      slug,
      type,
      phone,
      email,
      hours,
      accent
    },
    category->{title, slug},
    products[]->{
      _id,
      title,
      slug,
      description,
      offerLabel,
      image,
      shareTitle,
      shareDescription,
      shareImage,
      brochureAccent,
      category->{title, slug},
      store->{
        _id,
        name,
        slug,
        type,
        phone,
        email,
        hours,
        accent
      }
    }
  },
  "products": *[
    _type == "product" &&
    visible == true &&
    featured == true &&
    store->slug.current == $slug
  ] | order(_updatedAt desc)[0...8]{
    _id,
    title,
    slug,
    description,
    offerLabel,
    image,
    shareTitle,
    shareDescription,
    shareImage,
    brochureAccent,
    category->{title, slug},
    store->{
      _id,
      name,
      slug,
      type,
      phone,
      email,
      hours,
      accent
    }
  },
  "faqs": *[
    _type == "faq" &&
    visible == true &&
    (!defined(link) || link in ["/", "/" + $slug])
  ] | order(order asc, _createdAt asc){
    _id,
    question,
    answer,
    category,
    keywords,
    link,
    order
  }
}`;

export const restaurantPageQuery = `*[_type == "restaurantPage"][0]`;

export const featuredPromotionsQuery = `*[
  _type == "promotion" &&
  active == true &&
  featured == true &&
  (!defined(validFrom) || validFrom <= $today) &&
  (!defined(validTo) || validTo >= $today)
] | order(order asc, validTo asc){
  _id,
  title,
  description,
  label,
  discount,
  validFrom,
  validTo,
  terms,
  image,
  shareTitle,
  shareDescription,
  shareImage,
  brochureAccent,
  store->,
  category->,
  products[]->{
    _id,
    title,
    slug,
    description,
    offerLabel,
    image,
    shareTitle,
    shareDescription,
    shareImage,
    brochureAccent,
    category->,
    store->
  }
}`;

export const faqQuery = `*[_type == "faq" && visible == true] | order(order asc, _createdAt asc){
  _id,
  question,
  answer,
  category,
  keywords,
  link,
  order
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
    category,
    keywords,
    link
  }
}`;
