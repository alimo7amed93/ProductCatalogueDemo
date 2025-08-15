// app/layout.tsx
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-gray-900 border-b border-gray-200">
          <nav className="max-w-5xl mx-auto flex items-center justify-center p-4">
            <h1 className="text-xl font-bold text-white">TMF620 Catalogue Demo</h1>
          </nav>
        </header>
        <main className="mx-auto">{children}</main>
      </body>
    </html>
  );
}
