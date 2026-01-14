"use client";

import { getPortfolioData } from "@/services/dashboard.service";
import { formatCurrency } from "@/utils/formatters";
import React, { useMemo, useState } from "react";

function DashboardPortfolio({
  selectedTimeRange,
  setSelectedTimeRange,
}: {
  selectedTimeRange: string;
  setSelectedTimeRange: (range: string) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Portfolio</h2>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">
            {formatCurrency(57660.35)}
          </span>
          <span className="text-sm text-green-500">+2.84%</span>
        </div>
      </div>
      <div className="flex gap-2">
        {["5 min", "15 min", "30 min", "1H", "24H", "1W", "1Y", "ALL"].map(
          (range) => (
            <button
              key={range}
              onClick={() => setSelectedTimeRange(range)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selectedTimeRange === range
                  ? "bg-blue-500 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {range}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default DashboardPortfolio;
