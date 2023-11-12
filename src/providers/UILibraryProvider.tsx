"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

function UILibraryProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </NextUIProvider>
  );
}

export default UILibraryProvider;
