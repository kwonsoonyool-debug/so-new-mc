"use client";

import { useEffect, useState } from "react";

const ACCENT = "#c9a961";
const KAKAO_URL = "https://pf.kakao.com/_BxkaYG/chat";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // HERO 섹션을 지나간 후에 CTA 등장 (약 400px)
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 transition-all duration-500 md:bottom-8 md:right-8"
      style={{
        transform: visible ? "translateY(0)" : "translateY(120px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* 확장 메뉴 */}
      {expanded && (
        <div
          className="mb-3 bg-white rounded-[18px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
          style={{ minWidth: "240px" }}
        >
          <div className="p-5">
            <div
              className="apple-legal uppercase tracking-widest mb-3 opacity-60"
              style={{ color: ACCENT }}
            >
              Contact
            </div>
            <div className="apple-body-emphasis mb-1" style={{ fontSize: "17px" }}>
              Sonew Wedding
            </div>
            <div className="apple-control opacity-60 mb-4">
              평균 1분 이내 · 즉시 답변
            </div>

            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full apple-pill apple-pill-primary-gold"
              style={{ padding: "12px 20px" }}
            >
              <span>카카오톡 상담</span>
            </a>
          </div>
        </div>
      )}

      {/* 메인 floating 버튼 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-5 py-3.5 rounded-full transition-all hover:scale-105"
        style={{
          background: ACCENT,
          color: "white",
          boxShadow: "0 8px 24px rgba(201, 169, 97, 0.4)",
        }}
        aria-label="상담 문의"
      >
        {/* 말풍선 아이콘 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        >
          {expanded ? (
            <path d="M12 5v14M5 12h14" />
          ) : (
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          )}
        </svg>
        <span className="apple-control-emphasis">
          {expanded ? "닫기" : "상담 문의"}
        </span>
      </button>
    </div>
  );
}
