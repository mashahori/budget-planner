import type { Metadata, Viewport } from "next";
import { Golos_Text, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["cyrillic", "latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Budget Planner — планировщик личного бюджета",
  description:
    "Budget Planner — планировщик личного бюджета: доходы, расходы, лимиты по категориям и цели на одном экране.",
  openGraph: {
    title: "Budget Planner — планируй бюджет, живи свободнее",
    description:
      "Планировщик личного бюджета: доходы, расходы, лимиты и цели на одном экране.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfbfa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline script adds the `js` class before first paint, so scroll-reveal
    // styles only hide content when JavaScript is actually available.
    <html
      lang="ru"
      className={`${golos.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body id="top">{children}</body>
    </html>
  );
}