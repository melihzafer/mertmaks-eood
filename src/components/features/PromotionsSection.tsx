import Image from "next/image";
import Link from "next/link";
import { getFeaturedPromotions, getPromotionDateRange } from "@/lib/promotions";
import { Badge } from "../ui/badge";
import { Calendar, Tag } from "lucide-react";

/**
 * PromotionsSection - Server Component that displays featured promotions
 *
 * Features:
 * - Loads promotions from data/promotions.jsonl
 * - Filters by active and featured status
 * - Displays discount badges
 * - Date range validation
 */
export async function PromotionsSection() {
  const promotions = getFeaturedPromotions();

  if (promotions.length === 0) {
    return (
      <section className="py-24 bg-linear-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Текущи промоции</h2>
          <p className="text-xl text-gray-600">Очаквайте скоро...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-linear-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Текущи <span className="text-red-600">промоции</span>
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Специални оферти и отстъпки в нашите обекти
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {promotions.map((promo) => {
            const storeColors = {
              supermarket: "bg-red-100 text-red-800 border-red-200",
              industrial: "bg-pink-100 text-pink-800 border-pink-200",
              construction: "bg-blue-100 text-blue-800 border-blue-200",
            };

            return (
              <article
                key={promo.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Discount Badge */}
                  {promo.discount > 0 && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      -{promo.discount}%
                    </div>
                  )}

                  {/* Store Badge */}
                  <div
                    className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-semibold border ${storeColors[promo.store]}`}
                  >
                    {promo.store === "supermarket" && "Супермаркет"}
                    {promo.store === "industrial" && "Индустриална база"}
                    {promo.store === "construction" && "Строителен магазин"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {promo.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {promo.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {promo.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3" />
                      Валидна
                    </Badge>
                  </div>

                  {/* Date Range */}
                  <p className="text-sm text-gray-500 mb-4">
                    {getPromotionDateRange(promo)}
                  </p>

                  {/* CTA */}
                  <Link
                    href={`/${promo.store}`}
                    className="inline-block text-red-600 font-semibold hover:text-red-700 transition-colors"
                  >
                    Разгледай повече →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

