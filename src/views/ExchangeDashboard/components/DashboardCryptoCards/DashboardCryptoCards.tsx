"use client";

import React from "react";
import CryptoCard from "@/components/dashboard/CryptoCard";
import { getCryptoCards } from "@/services/dashboard.service";

function DashboardCryptoCards() {
  const cryptoCards = getCryptoCards();

  return (
    <div className="relative mb-8 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cryptoCards.map((card) => (
          <CryptoCard key={card.id} data={card} />
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Previous"
      >
        <img src="/icons/arrow-left.png" alt="Previous" className="w-6 h-6" />
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Next"
      >
        <img src="/icons/arrow-right.png" alt="Next" className="w-6 h-6" />
      </button>
    </div>
  );
}

export default DashboardCryptoCards;
