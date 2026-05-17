import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "ChatGPTree Voice",
  description: "A voice-first AI companion. Talk. Grow. Plant. Share.",
  keywords: ["AI", "voice", "tree planting", "climate", "forest"],
  openGraph: {
    title: "ChatGPTree Voice",
    description: "A voice-first AI companion where your conversations grow real forests.",
    type: "website",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GPTree_ProfilePic%20%281%29%20%281%29-h6bSZ7Mr2IxB30MVPnQzrlSjmaiHlq.png",
        width: 1080,
        height: 1080,
        alt: "ChatGPTree",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ChatGPTree Voice",
    description: "A voice-first AI companion where your conversations grow real forests.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GPTree_ProfilePic%20%281%29%20%281%29-h6bSZ7Mr2IxB30MVPnQzrlSjmaiHlq.png"],
  },
  icons: {
    icon: [
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPTree_Icon_GreenBox%20%283%29-9PC5q624T18kiddnKEC8yOPPPBnfIo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPTree_Icon_GreenBox%20%283%29-9PC5q624T18kiddnKEC8yOPPPBnfIo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ChatGPTree",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0d3320",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
