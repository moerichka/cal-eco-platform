"use client";

import { getBasicStatistics } from "@/services/dashboard.service";
import { formatCurrency } from "@/utils/formatters";
import React, { useMemo } from "react";
import { Cell, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

const formatNumber = (value: number): string => {
  return value.toLocaleString("en-US");
};

function DashboardBasicStatistics() {
  const statistics = getBasicStatistics();

  const statsChartData = useMemo(() => {
    const maxValue = Math.max(
      statistics.allTimeVolume,
      statistics.dailyTradeVolume,
      statistics.lockedValue,
      statistics.activeUsers
    );

    return [
      {
        name: "Active Users",
        value: statistics.activeUsers,
        fill: "#a855f7",
        normalizedValue: (statistics.activeUsers / maxValue) * 100,
      },
      {
        name: "Locked Value",
        value: statistics.lockedValue,
        fill: "#3b82f6",
        normalizedValue: (statistics.lockedValue / maxValue) * 100,
      },
      {
        name: "24 Hour Trade Volume",
        value: statistics.dailyTradeVolume,
        fill: "#10b981",
        normalizedValue: (statistics.dailyTradeVolume / maxValue) * 100,
      },
      {
        name: "All time Volume",
        value: statistics.allTimeVolume,
        fill: "#f97316",
        normalizedValue: (statistics.allTimeVolume / maxValue) * 100,
      },
    ];
  }, [statistics]);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Basic Statistics
      </h2>

      <div
        className="h-48 mb-6 flex items-center justify-center relative"
        style={{ width: "100%" }}
      >
        {statsChartData.map((entry, index) => {
          const baseInner = 20;
          const gap = -5;
          const arcWidth = 20;

          const innerRadius = baseInner + index * (arcWidth + gap);
          const outerRadius = innerRadius + arcWidth;

          const singleData = [
            {
              name: "max",
              value: 100,
              fill: "rgba(0,0,0,0)",
            },
            {
              name: entry.name,
              value: entry.normalizedValue,
              fill: entry.fill,
            },
          ];

          return (
            <div
              key={entry.name}
              className="absolute inset-0"
              style={{ width: "100%", height: "100%" }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius={`${innerRadius}%`}
                  outerRadius={`${outerRadius}%`}
                  startAngle={180}
                  endAngle={0}
                  data={singleData}
                  barSize={10}
                >
                  <RadialBar dataKey="value" cornerRadius={4}>
                    {singleData.map((dataPoint, dataIndex) => (
                      <Cell
                        key={`cell-${dataIndex}`}
                        fill={
                          dataPoint.fill === "rgba(0,0,0,0)"
                            ? "transparent"
                            : dataPoint.fill
                        }
                      />
                    ))}
                  </RadialBar>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        {statsChartData.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stat.fill }}
              />
              <span className="text-sm text-white/70">{stat.name}:</span>
            </div>
            <span className="text-sm font-semibold text-white">
              {stat.name === "Active Users"
                ? formatNumber(stat.value)
                : formatCurrency(stat.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardBasicStatistics;
