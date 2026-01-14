"use client";

import React, { useState } from "react";
import HoldingsTable from "../../components/dashboard/HoldingsTable";
import WatchlistCard from "../../components/dashboard/WatchlistCard";
import TransactionsTable from "../../components/dashboard/TransactionsTable";
import {
  getHoldings,
  getWatchlist,
  getTransactions,
} from "../../services/dashboard.service";
import DashboardHeader from "./components/DashboardHeader";
import DashboardCryptoCards from "./components/DashboardCryptoCards";
import DashboardBasicStatistics from "./components/DashboardBasicStatistics";
import DashboardMarketOverview from "./components/DashboardMarketOverview";
import DashboardPortfolio from "./components/DashboardPortfolio";
import DashboardHoldings from "./components/DashboardHoldings";

const ExchangeDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24H");

  const holdings = getHoldings();
  const watchlist = getWatchlist();
  const transactions = getTransactions();

  return (
    <div className="w-full min-h-screen px-12 py-6">
      {/* Dashboard Header */}
      <DashboardHeader />

      <DashboardCryptoCards />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 mt-12">
        <DashboardMarketOverview />

        <DashboardBasicStatistics />
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 mb-8 mt-12">
        <DashboardPortfolio
          selectedTimeRange={selectedTimeRange}
          setSelectedTimeRange={setSelectedTimeRange}
        />

        <DashboardHoldings selectedTimeRange={selectedTimeRange} />
      </div>

      <div className="mb-8 mt-12">
        <HoldingsTable holdings={holdings} />
      </div>

      <div className="mb-8 mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">My watchlist</h2>
          <button
            type="button"
            className="text-sm text-blue-400 hover:text-blue-300"
            onClick={() => {}}
            aria-label="View all watchlist items"
          >
            View all
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlist.map((item) => (
            <WatchlistCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
};

export default ExchangeDashboard;
