"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useEmbedMode } from "./useEmbedMode";

const ACCENT = "#c9a961";

const MENU_ITEMS = [
  { label: "홈", href: "#hero" },
  { label: "소개", href: "#intro" },
  { label: "사회자", href: "#our-hosts" },
  { label: "진행 과정", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const KAKAO_URL = "https://pf.kakao.com/_BxkaYG/chat";

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const embed = useEmbedMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // iframe 임베드 시 워드프레스 상단 네비와 겹치므로 숨김
  if (embed) return null;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(255, 255, 255, 0.85)"
          : "rgba(0, 0, 0, 0.25)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 0, 0, 0.06)"
          : "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-[60px] md:h-[68px]">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center transition-opacity hover:opacity-85"
            aria-label="Sonew Wedding MC"
          >
            <span
              style={{
                position: "relative",
                width: 140,
                height: 36,
                flexShrink: 0,
                filter: scrolled ? "none" : "brightness(0) invert(1)",
                transition: "filter 0.3s ease",
              }}
            >
              <Image
                src="/logo/sonew-logo-horizontal.png"
                alt="So New Wedding"
                fill
                sizes="140px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
                priority
              />
            </span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-7">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="apple-control transition-opacity hover:opacity-100"
                style={{
                  color: scrolled ? "#1d1d1f" : "#ffffff",
                  opacity: 0.85,
                  fontSize: "13.5px",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="#our-hosts"
              className="apple-pill"
              style={{
                background: scrolled
                  ? "rgba(0, 0, 0, 0.06)"
                  : "rgba(255, 255, 255, 0.15)",
                color: scrolled ? "#1d1d1f" : "#ffffff",
                padding: "8px 16px",
                fontSize: "13px",
                borderRadius: "980px",
              }}
            >
              사회자 프로필 보기
            </a>
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-pill"
              style={{
                background: ACCENT,
                color: "#ffffff",
                padding: "8px 18px",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "980px",
              }}
            >
              카카오톡 상담하기
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10"
            aria-label="메뉴"
          >
            <span
              className="block w-5 h-[2px] transition-transform"
              style={{
                background: scrolled ? "#1d1d1f" : "#ffffff",
                transform: mobileOpen
                  ? "translateY(7px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block w-5 h-[2px] transition-opacity"
              style={{
                background: scrolled ? "#1d1d1f" : "#ffffff",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-[2px] transition-transform"
              style={{
                background: scrolled ? "#1d1d1f" : "#ffffff",
                transform: mobileOpen
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t pt-4 pb-6"
            style={{
              borderColor: scrolled
                ? "rgba(0,0,0,0.06)"
                : "rgba(255,255,255,0.1)",
            }}
          >
            <nav className="flex flex-col gap-1">
              {MENU_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="apple-control py-3 px-2 rounded-lg transition-colors"
                  style={{
                    color: scrolled ? "#1d1d1f" : "#ffffff",
                    fontSize: "15px",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-2 mt-4 pt-4" style={{ borderTop: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.1)" }}>
              <a
                href="#our-hosts"
                onClick={() => setMobileOpen(false)}
                className="apple-pill text-center"
                style={{
                  background: scrolled
                    ? "rgba(0,0,0,0.06)"
                    : "rgba(255,255,255,0.15)",
                  color: scrolled ? "#1d1d1f" : "#ffffff",
                  padding: "12px 18px",
                  fontSize: "14px",
                  borderRadius: "980px",
                }}
              >
                사회자 프로필 보기
              </a>
              <a
                href={KAKAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="apple-pill text-center"
                style={{
                  background: ACCENT,
                  color: "#ffffff",
                  padding: "12px 18px",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "980px",
                }}
              >
                카카오톡 상담하기
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
