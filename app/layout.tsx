import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZhouPeng Smart Living | Global Smart Home Mall",
  description:
    "Modern smart home mall for custom doors, wall systems, cabinets, kitchens, hardware, and whole-home orders.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
