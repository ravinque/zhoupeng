import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZhouPeng 智能家居商城 | Global Smart Home Mall",
  description:
    "ZhouPeng smart home mall for doors, wall systems, cabinets, kitchens, hardware, whole-home orders, and customer service.",
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
