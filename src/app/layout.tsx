import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "@/components/primitives/Toast";
import { AppNav } from "./AppNav";
import "@/components/primitives/tokens.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mikro-ui",
  description: "Minimal UI component library built with React and CSS Modules.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          // Applies the stored/system theme before paint to avoid a flash of the wrong theme.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('mikro-ui-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AppNav />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
