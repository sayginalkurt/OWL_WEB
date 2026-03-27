import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PostHogProvider } from "@/components/posthog-provider";
import { SITE_URL, toAbsoluteUrl } from "@/lib/seo/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OWL Intelligence",
    template: "%s | OWL Intelligence",
  },
  description:
    "AI-powered intelligence products grounded in authentic field data.",
  openGraph: {
    type: "website",
    siteName: "OWL Intelligence",
    url: SITE_URL,
    title: "OWL Intelligence",
    description:
      "AI-powered intelligence products grounded in authentic field data.",
    images: [{ url: toAbsoluteUrl("/OWLLogo.png") }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OWL Intelligence",
    description:
      "AI-powered intelligence products grounded in authentic field data.",
    images: [toAbsoluteUrl("/OWLLogo.png")],
  },
  icons: {
    icon: "/OWLLogo.png",
    shortcut: "/OWLLogo.png",
    apple: "/OWLLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
