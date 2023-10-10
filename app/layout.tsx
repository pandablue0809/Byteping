import React from "react";
import type { Metadata } from "next";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import ChatProvider from "./context/ChatProvider";
import StyledComponentsProvider from "./providers/StyledComponentsProvider";
import { Nunito } from "next/font/google";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BytePing",
  description: "Want to share a byte with you pal, BytePing is there..."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <StyledComponentsProvider>
        <ChatProvider>
          <ReactQueryProvider>
            <body className={font.className}>{children}</body>
          </ReactQueryProvider>
        </ChatProvider>
      </StyledComponentsProvider>
    </html>
  );
}
