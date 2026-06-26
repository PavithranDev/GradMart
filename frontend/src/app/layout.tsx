import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { CommandPalette } from "@/components/ui/command-palette";
import { AuthProvider } from "@/lib/auth/AuthContext";

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "GradMart - Premium Marketplace for College Projects",
  description: "Discover premium final year projects, source code, report PDFs, and setup guides.",
  keywords: ["college projects", "source code", "mini projects", "engineering projects", "final year projects"],
  authors: [{ name: "GradMart Team" }],
  creator: "GradMart",
  publisher: "GradMart Inc.",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://gradmart.in"),
  openGraph: {
    title: "GradMart - Premium Marketplace for College Projects",
    description: "Discover premium final year projects, source code, report PDFs, and setup guides.",
    url: "https://gradmart.in",
    siteName: "GradMart",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://gradmart.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GradMart Premium Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GradMart - Premium Marketplace for College Projects",
    description: "Discover premium final year projects, source code, report PDFs, and setup guides.",
    creator: "@gradmart",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${cormorant.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <LenisProvider>
              {children}
              <CommandPalette />
              <Toaster position="bottom-right" richColors toastOptions={{ style: { borderRadius: '16px', fontFamily: 'var(--font-dm-sans)' } }} />
            </LenisProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
