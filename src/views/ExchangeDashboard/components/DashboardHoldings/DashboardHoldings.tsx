"use client";

import { getPortfolioData } from "@/services/dashboard.service";
import { formatCurrency } from "@/utils/formatters";
import React, { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function DashboardHoldings({
  selectedTimeRange,
}: {
  selectedTimeRange: string;
}) {
  const portfolioData = useMemo(
    () => getPortfolioData(selectedTimeRange),
    [selectedTimeRange]
  );

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={portfolioData} key={`portfolio-${selectedTimeRange}`}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis
            dataKey="time"
            stroke="#ffffff60"
            tick={{ fill: "#ffffff60", fontSize: 12 }}
          />
          <YAxis
            stroke="#ffffff60"
            tick={{ fill: "#ffffff60", fontSize: 12 }}
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
          <Line
            type="monotone"
            dataKey="value"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={false}
            name="Portfolio"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardHoldings;
