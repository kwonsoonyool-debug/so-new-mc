"use client";

import { useEffect, useState } from "react";
import { useEmbedMode } from "./useEmbedMode";

const KAKAO_URL = "https://pf.kakao.com/_BxkaYG/chat";

/**
 * 메인 페이지 하단 플로팅 카카오톡 상담 CTA.
 * 모바일 + 데스크탑 공통, viewport 정중앙 정렬.
 * (이름은 historical reasons로 MobileBottomCTA 유지)
 */
export default function MobileBottomCTA() {
  const [visible, setVisible] = useState(false);
  const embed = useEmbedMode();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 320);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // iframe 임베드 시 워드프레스 하단 플로팅과 겹치므로 숨김
  if (embed) return null;

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "fixed",
        bottom: "max(env(safe-area-inset-bottom), 20px)",
        left: "50%",
        zIndex: 50,
        width: "calc(100% - 32px)",
        maxWidth: "440px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(30px)",
        transition:
          "opacity 0.35s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* 글로우 펄스 링 */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "9999px",
          boxShadow: "0 0 0 0 rgba(254, 229, 0, 0.55)",
          animation: visible ? "kakao-cta-pulse 2.2s ease-out infinite" : "none",
          pointerEvents: "none",
        }}
      />

      <a
        href={KAKAO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="kakao-cta-button"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
          background: "#FEE500",
          color: "#191919",
          fontWeight: 700,
          fontSize: "16.5px",
          letterSpacing: "-0.3px",
          padding: "17px 22px",
          borderRadius: "9999px",
          boxShadow:
            "0 14px 36px rgba(254, 229, 0, 0.55), 0 6px 18px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          textDecoration: "none",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 3C6.48 3 2 6.58 2 11c0 2.78 1.78 5.22 4.5 6.62-.16.6-1.06 3.32-1.1 3.5 0 0-.02.16.08.22.1.06.22.02.22.02.3-.04 3.46-2.26 4.02-2.66.76.1 1.5.16 2.28.16 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
        </svg>
        <span>카카오톡 상담</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ opacity: 0.7 }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </a>
    </div>
  );
}
