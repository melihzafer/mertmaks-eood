"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar } from "lucide-react";
import type { StoreArticle } from "@/data/blog";

interface StoreBlogSectionProps {
  articles: StoreArticle[];
  accentColor?: string;
}

export function StoreBlogSection({
  articles,
  accentColor = "#E53E3E",
}: StoreBlogSectionProps) {
  if (articles.length === 0) return null;

  return (
    <section className="section-tight rule">
      <div className="container">
        <div className="indexed-head-compact">
          <div className="eyebrow">04 / Съвети и идеи</div>
          <h2>Полезно от магазина</h2>
          <p className="lead">
            Кратки статии, съвети и новини свързани с този обект.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="bento-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              {article.image && (
                <div className="relative h-48 -mx-[26px] -mt-[26px] mb-4 overflow-hidden rounded-t-[26px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Calendar className="w-3 h-3" />
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString("bg-BG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h3 className="text-lg font-bold leading-snug">{article.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                {article.excerpt}
              </p>
              <div
                className="mt-4 text-sm font-semibold"
                style={{ color: accentColor }}
              >
                Прочети повече →
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
