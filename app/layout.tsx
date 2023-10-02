import React from "react";
import "@/styles/global.css";
import type { Metadata } from "next";
import ReactQueryProvider from "./providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "BytePing",
  description: "Want to share a byte with you pal, BytePing is there..."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body>{children}</body>
      </ReactQueryProvider>
    </html>
  );
}
