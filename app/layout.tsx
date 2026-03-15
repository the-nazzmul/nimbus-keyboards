import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth", "slnt", "opsz"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://switch-bliss-keyboards.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SwitchBliss Keyboards | Vapor75 — Premium Mechanical Keyboards",
    template: "%s | SwitchBliss Keyboards",
  },
  description:
    "SwitchBliss builds the Vapor75: a premium 75% mechanical keyboard with hot-swappable switches, aluminum case, wireless connectivity, and custom keycaps. Built for the bold.",
  keywords: [
    "mechanical keyboard",
    "Vapor75",
    "SwitchBliss",
    "hot-swappable",
    "custom keycaps",
    "75% keyboard",
    "premium keyboard",
    "wireless keyboard",
    "aluminum keyboard",
  ],
  authors: [{ name: "SwitchBliss" }],
  creator: "SwitchBliss",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "SwitchBliss Keyboards",
    title: "SwitchBliss Keyboards | Vapor75 — Premium Mechanical Keyboards",
    description:
      "The Vapor75 is a premium 75% mechanical keyboard built for performance and aesthetics. Hot-swappable switches, aluminum case, wireless, custom keycaps. Built for the bold.",
    images: [
      {
        url: "/renders/render_2.png",
        width: 1200,
        height: 630,
        alt: "Vapor75 mechanical keyboard by SwitchBliss",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SwitchBliss Keyboards | Vapor75 — Premium Mechanical Keyboards",
    description:
      "Premium 75% mechanical keyboard. Hot-swappable switches, aluminum case, wireless, custom keycaps. Built for the bold.",
    images: ["/renders/render_2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoFlex.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
