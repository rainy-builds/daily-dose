import type { Metadata } from "next";
import { Bagel_Fat_One } from "next/font/google";
import "./globals.css";

const bagelFatOne = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bagel-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daily Dose of Happiness",
  description: "Enter 1–3 words and receive a personalised daily affirmation.",
  openGraph: {
    title: "Daily Dose of Happiness",
    description: "Enter 1–3 words and receive a personalised daily affirmation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bagelFatOne.variable} h-full`}>
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}
