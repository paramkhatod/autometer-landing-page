import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Autometer - Free AI Agent Builder for Students & Teachers",
  description: "Build automation workflows like Zapier and n8n, completely free. AI-powered automation for students and teachers. No credit card required.",
  keywords: ["automation", "AI", "agent builder", "free", "students", "teachers", "Zapier alternative", "n8n alternative"],
  authors: [{ name: "Autometer" }],
  openGraph: {
    title: "Autometer - Free AI Agent Builder",
    description: "Build automation workflows like Zapier and n8n, completely free for students and teachers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
