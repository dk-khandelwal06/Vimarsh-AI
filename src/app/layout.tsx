import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vimarsh.AI | The Socratic Fraud Shield | SANGYAN 2026",
  description:
    "An intelligent investor-resilience fraud shield developed for SANGYAN Hackathon 2026 (IIT BHU / SEBI / NSDL). Interrupting digital financial scams through multimodal AI and Automated Socratic Questioning.",
  keywords: [
    "Vimarsh.AI",
    "SANGYAN 2026",
    "SEBI",
    "NSDL",
    "IIT BHU",
    "Investor Resilience",
    "Fraud Shield",
    "Socratic Questioning",
    "Digital Fraud Detection",
    "Pig Butchering",
    "Cyber Crime 1930",
  ],
  authors: [
    { name: "Daksh Khandelwal (IIT Jodhpur)" },
    { name: "Khushi Kushwah (IIT Jodhpur)" },
  ],
  openGraph: {
    title: "Vimarsh.AI | The Socratic Fraud Shield",
    description: "Interrupting Fraud with Intelligent Deliberation. Track A: Digital Fraud & Scam Resilience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Anti-flash script for persistent dark/light theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('vimarsh_theme_v1');
                if (t === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen flex flex-col bg-[#0B1020] text-slate-100 selection:bg-indigo-500/30 selection:text-cyan-300`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
