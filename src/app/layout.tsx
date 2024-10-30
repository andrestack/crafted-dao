import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const leagueSpartan = localFont({
  src: "./fonts/LeagueSpartan-Bold.woff",
  variable: "--font-league-spartan-bold",
});

const montserrat = localFont({
  src: "./fonts/Montserrat-Regular.woff",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Crafted Finishes Dashboard",
  description:
    "Crafted Finishes DAO Dashboard to keep track of profits staked and shared",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${leagueSpartan.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
