// Static blog articles fallback data
// In production, these are fetched from Sanity CMS

export interface StoreArticle {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  store: "supermarket" | "construction" | "industrial";
  publishedAt: string;
  image?: string;
  slug: string;
}

export const storeArticles: StoreArticle[] = [
  {
    id: "blog-super-001",
    slug: "kak-da-izberete-sveji-produkti",
    title: "Как да изберете свежи продукти",
    excerpt: "Практични съвети за избор на плодове и зеленчуци в супермаркета.",
    body: "Свежите продукти се познават по цвета, аромата и твърдостта. Плодовете не трябва да имат прекалено много петна, а зеленчуците — да са стегнати. В MERTMAX зареждаме всеки ден, за да има свежест на щанда.",
    store: "supermarket",
    publishedAt: "2026-05-10",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=600&fit=crop",
  },
  {
    id: "blog-super-002",
    slug: "mlechni-produkti-za-semejnata-koshnica",
    title: "Млечни продукти за семейната кошница",
    excerpt: "Какво да сложите в списъка, за да не пропуснете основното.",
    body: "Мляко, кисело мляко, сирене и кашкавал са продукти, които почти всяко семейство купува редовно. Препоръчваме да проверявате срока на годност и да съхранявате правилно у дома.",
    store: "supermarket",
    publishedAt: "2026-05-15",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&h=600&fit=crop",
  },
  {
    id: "blog-cons-001",
    slug: "leten-remont-saveti-za-nachinaeshi",
    title: "Летен ремонт — съвети за начинаещи",
    excerpt: "От какво да започнете и как да не прехарчите.",
    body: "Летният ремонт изисква добро планиране. Започнете със списък на материалите — бои, грундове, четки, шпакловка. При нас ще намерите основните неща, а ако не сте сигурни — попитайте на място.",
    store: "construction",
    publishedAt: "2026-05-08",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
  },
  {
    id: "blog-cons-002",
    slug: "instrumenti-koito-vseki-trjabva-da-ima",
    title: "Инструменти, които всеки трябва да има",
    excerpt: "Базов комплект за дребни ремонти у дома.",
    body: "Отвертки, чук, нивелир и винтоверт — това е минимумът, с който може да се справите с повечето битови задачи. В строителния магазин на MERTMAX имаме избор за всеки бюджет.",
    store: "construction",
    publishedAt: "2026-05-18",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop",
  },
  {
    id: "blog-ind-001",
    slug: "posuda-za-kuhnjata-kakvo-novo",
    title: "Посуда за кухнята — какво ново",
    excerpt: "Практични находки за организация и сервиране.",
    body: "Кутии за съхранение, комплекти чаши и прибори — малки покупки, които правят ежедневието по-лесно. В магазина за домашни потреби подбираме практични неща на нормални цени.",
    store: "industrial",
    publishedAt: "2026-05-12",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
  },
  {
    id: "blog-ind-002",
    slug: "tekstil-za-doma-izbor-na-kurpi",
    title: "Текстил за дома — избор на кърпи",
    excerpt: "Какво да търсите при покупка на хавлии и домашен текстил.",
    body: "Плътността, мекотата и устойчивостта на пране са важни показатели. При нас ще намерите кърпи, спално бельо и дребен текстил, подбрани за ежедневна употреба.",
    store: "industrial",
    publishedAt: "2026-05-20",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6a?w=800&h=600&fit=crop",
  },
];

export function getArticlesForStore(
  slug: string,
  limit = 3,
): StoreArticle[] {
  return storeArticles
    .filter((a) => a.store === slug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}
