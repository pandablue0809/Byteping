import React from "react";
import type { Metadata } from "next";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import ChatProvider from "./contexts/ChatProvider";
import StyledComponentsProvider from "./providers/StyledComponentsProvider";
import { Nunito } from "next/font/google";
import DarkLightModeProvider from "./contexts/DarkLightModeProvider";
import StyledComponentsRegistry from "./libs/registry";
import SmoothScroll from "./components/SmoothScroll";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BytePing",
  description: "Want to share a byte with you pal, BytePing is there..."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <DarkLightModeProvider>
        <ChatProvider>
          <StyledComponentsRegistry>
            <StyledComponentsProvider>
              <ReactQueryProvider>
                <SmoothScroll>
                  <body className={font.className}>{children}</body>
                </SmoothScroll>
              </ReactQueryProvider>
            </StyledComponentsProvider>
          </StyledComponentsRegistry>
        </ChatProvider>
      </DarkLightModeProvider>
    </html>
  );
}
