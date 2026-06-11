import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import FloatingCTA from "./_components/FloatingCTA";
import TopNav from "./_components/TopNav";
import MobileBottomCTA from "./_components/MobileBottomCTA";
import EmbedBodyClass from "./_components/EmbedBodyClass";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mc.sonewwedding.com"),
  title: "Sonew Wedding MC · 결혼식 사회자",
  description:
    "쏘뉴웨딩의 결혼식 사회자 소개. 검증된 프로페셔널 웨딩 사회자가 두 분의 가장 빛나는 순간을 이끌어드립니다.",
  keywords: [
    "결혼식 사회자",
    "웨딩 사회자",
    "본식 사회자",
    "예식 MC",
    "쏘뉴웨딩",
    "Sonew",
  ],
  icons: {
    icon: [
      { url: "/logo/sonew-favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo/sonew-favicon.png" },
    ],
  },
  openGraph: {
    title: "Sonew Wedding MC · 결혼식 사회자",
    description: "검증된 프로페셔널 웨딩 사회자",
    type: "website",
    images: [
      { url: "/logo/sonew-logo.png", width: 640, height: 580, alt: "Sonew" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#c9a961",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${notoSerifKR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-primary">
        <EmbedBodyClass />
        <TopNav />
        {children}
        <div className="floating-cta-desktop-only">
          <FloatingCTA />
        </div>
        <MobileBottomCTA />
      </body>
    </html>
  );
}
