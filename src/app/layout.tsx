import Navbar from "@/components/nav-bar";
import { JobProvider } from "@/context/refresh-context";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
  title: {
    template: "%s | Tracker",
    default: "Tracker - Job Application Tracker",
  },
  description:
    "Tracker: Track job applications, manage interviews, organize offers. Stay organized and land your dream job with real-time updates.",
  keywords: [
    "job tracker",
    "jobs tracker",
    "job application tracker",
    "store job",
    "job search",
    "interview tracker",
  ],
  authors: [
    {
      name: "Likith Naga Sai Adusumalli",
      url: "https://likith-adusumalli.vercel.app",
    },
  ],
  creator: "Likith Naga Sai Adusumalli",
  publisher: "Tracker",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Tracker - Job Application Tracker",
    description:
      "Track job applications in real-time. Stay organized throughout your job search.",
    url: "https://tracker.vercel.app",
    siteName: "Tracker",
    images: [
      {
        url: "https://tracker.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tracker - Job Application Tracker",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tracker - Job Application Tracker",
    description:
      "Real-time job application tracking. Stay organized and land interviews.",
    images: ["https://tracker.vercel.app/og-image.png"],
    creator: "@LikithDeveloper",
    site: "@LikithDeveloper",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: "#00be6a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JobProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#18181b",
                color: "#fff",
                border: "1px solid #27272a",
              },
            }}
          />
        </JobProvider>
      </body>
    </html>
  );
}
