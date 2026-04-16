import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lightboard",
  description: "Simple lightboard display",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${kanit.className} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
