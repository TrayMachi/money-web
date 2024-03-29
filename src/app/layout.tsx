import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { cn } from "@/utils/cn";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Money Management",
  description: "Let's save your money",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          inter,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster visibleToasts={5} position="bottom-right"/>
        </ThemeProvider>
      </body>
    </html>
  );
}
