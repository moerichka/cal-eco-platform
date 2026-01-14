"use client";

import React from "react";
import { SnackbarProvider } from "notistack";
import { Web3ReactProvider } from "@web3-react/core";
import { ToastContainer } from "react-toastify";
import { Buffer } from "buffer";

import "react-toastify/dist/ReactToastify.css";

import connectors from "../connectors/index";
import MetmaskContextProvider from "../contexts/MetmaskContextProvider";
import AuthContextProvider from "../contexts/AuthContext";

// Polyfill Buffer for browser
if (typeof window !== "undefined" && !(window as any).Buffer) {
  (window as any).Buffer = Buffer;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3ReactProvider connectors={connectors as any}>
      <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <MetmaskContextProvider>
          <AuthContextProvider>
            {children}
            <ToastContainer />
          </AuthContextProvider>
        </MetmaskContextProvider>
      </SnackbarProvider>
    </Web3ReactProvider>
  );
}
