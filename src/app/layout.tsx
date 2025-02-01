import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import { TranslationsProvider } from "@/providers/translations-provider.client";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alma - Immigration made easy!",
  description:
    "Alma simplifies immigration for technologists, founders, researchers, and others at the top of their fields with our highly experienced immigration lawyers and a user-friendly platform. Try Alma today!",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const translatedStrings = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <head>
        <link
          rel="shortcut icon"
          href="https://cdn.prod.website-files.com/656ddb1f77f5af1d193d7150/657a53b312b0dc1a8b98b495_32x32%20Transparent.png"
          type="image/x-icon"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationsProvider translatedStrings={translatedStrings}>
          <UserProvider>{children}</UserProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
