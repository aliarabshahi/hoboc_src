"use client";

import { InspiringQuoteData } from "./InspiringQuoteTexts";

export default function InspiringQuoteCard() {
  return (
    <figure>
      <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-relaxed">
        <p>{InspiringQuoteData.quote}</p>
      </blockquote>

      {InspiringQuoteData.showAuthor && (
        <figcaption className="mt-6 text-base text-gray-300">
          <div className="font-semibold">{InspiringQuoteData.author}</div>
          <div className="mt-1">{InspiringQuoteData.role}</div>
        </figcaption>
      )}
    </figure>
  );
}
