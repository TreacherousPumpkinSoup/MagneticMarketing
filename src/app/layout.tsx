import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway"
});

export const metadata: Metadata = {
  title: "Magnetic Marketing for Cult Brands",
  description: "Y2K maximalist marketing services website."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} bg-cream text-oxblood`}>{children}</body>
    </html>
  );
}
