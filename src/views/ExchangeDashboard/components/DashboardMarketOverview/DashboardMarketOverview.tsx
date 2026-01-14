"use client";

import React, { useState } from "react";

import s from "./DashboardMarketOverview.module.scss";
import { getMarketOverviewData } from "@/services/dashboard.service";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/utils/formatters";

function DashboardMarketOverview() {
  const [selectedTokens, setSelectedTokens] = useState<string[]>([
    "BTC",
    "ETH",
  ]);
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly (2020)");

  const marketData = getMarketOverviewData();

  const handleTokenToggle = (token: string) => {
    setSelectedTokens((prev) =>
      prev.includes(token) ? prev.filter((t) => t !== token) : [...prev, token]
    );
  };

  return (
    <div className="lg:col-span-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
      <h2 className="text-xl font-semibold text-white mb-2">Market Overview</h2>
      <p className="text-sm text-white/60 mb-4">
        Lorem ipsum dolor sit amet, consectetur
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex gap-2">
          {["BTC", "ETH", "BNB", "XRP"].map((token) => (
            <label key={token} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTokens.includes(token)}
                onChange={() => handleTokenToggle(token)}
                className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-white">{token}</span>
            </label>
          ))}
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-1 rounded border border-white/20 bg-transparent text-white text-sm outline-none focus:ring-2 focus:ring-white/30"
        >
          <option value="Weekly (2020)" className="bg-[#0b0f2e]">
            Weekly (2020)
          </option>
          <option value="Monthly" className="bg-[#0b0f2e]">
            Monthly
          </option>
          <option value="Yearly" className="bg-[#0b0f2e]">
            Yearly
          </option>
        </select>
        <select className="px-3 py-1 rounded border border-white/20 bg-transparent text-white text-sm outline-none focus:ring-2 focus:ring-white/30">
          <option value="More Tokens" className="bg-[#0b0f2e]">
            More Tokens
          </option>
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={marketData}
            key={`market-${selectedTokens.join("-")}`}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis
              dataKey="week"
              stroke="#ffffff60"
              tick={{ fill: "#ffffff60", fontSize: 12 }}
            />
            <YAxis
              stroke="#ffffff60"
              tick={{ fill: "#ffffff60", fontSize: 12 }}
              domain={[200000, 800000]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: any) => formatCurrency(value)}
            />
            {selectedTokens.includes("BTC") && (
              <Line
                type="monotone"
                dataKey="BTC"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
                name="BTC"
              />
            )}
            {selectedTokens.includes("ETH") && (
              <Line
                type="monotone"
                dataKey="ETH"
                stroke="#627EEA"
                strokeWidth={2}
                dot={false}
                name="ETH"
              />
            )}
            {selectedTokens.includes("BNB") && (
              <Line
                type="monotone"
                dataKey="BNB"
                stroke="#F3BA2F"
                strokeWidth={2}
                dot={false}
                name="BNB"
              />
            )}
            {selectedTokens.includes("XRP") && (
              <Line
                type="monotone"
                dataKey="XRP"
                stroke="#23292F"
                strokeWidth={2}
                dot={false}
                name="XRP"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardMarketOverview;
