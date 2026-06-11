"use client";

/**
 * HostModal — 사회자 풀스크린 시트
 * 축가 SingerModal 패턴 계승: 바텀시트 진입 + 플로팅 X/카톡 CTA.
 * 사회자 버전 차이: 음성 샘플(진행 멘트) + SCENE 진행 영상(lite 패턴).
 * URL 동기화(?host=슬러그)는 부모(HostsGrid)가 담당.
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Host, KAKAO_URL } from "./hosts-data";
import AudioPreviewList from "./AudioPreviewList";
import VideoEmbed from "./VideoEmbed";

/** 한국어 받침에 따라 "로 / 으로" 자동 선택. ㄹ받침과 받침없음은 "로" */
function withRo(name: string): string {
  const last = name.charCodeAt(name.length - 1);
  if (last < 0xac00 || last > 0xd7a3) return `${name}로`;
  const jong = (last - 0xac00) % 28;
  const particle = jong === 0 || jong === 8 ? "로" : "으로";
  return `${name}${particle}`;
}

type Props = {
  host: Host | null;
  /** 그리드 내 표시 순번 (01부터) */
  index: number;
  onClose: () => void;
};

export default function HostModal({ host, index, onClose }: Props) {
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [stopToken, setStopToken] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (host) {
      setClosing(false);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      const id = window.requestAnimationFrame(() => setEntered(true));
      return () => window.cancelAnimationFrame(id);
    } else {
      setEntered(false);
    }
  }, [host]);

  useEffect(() => {
    if (!host) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [host]);

  useEffect(() => {
    if (!host) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  function handleClose() {
    setStopToken((t) => t + 1); // 오디오 강제 정지
    setClosing(true);
    setEntered(false);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  }

  if (!host || typeof document === "undefined") return null;

  const accentHex = host.accentHex;
  const visible = entered && !closing;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label={`${host.nameKo} 사회자 상세 정보`}
      >
        <div
          onClick={handleClose}
          className="absolute inset-0"
          style={{
            background: visible ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "background 0.28s ease",
          }}
        />

        <div
          ref={scrollRef}
          className="relative z-10 w-full md:max-w-2xl bg-white overflow-y-auto"
          style={{
            maxHeight: "92vh",
            height: "92vh",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            transform: visible ? "translateY(0%)" : "translateY(100%)",
            transition: "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
            paddingBottom: "max(env(safe-area-inset-bottom), 0px)",
          }}
        >
          {/* Grabber (모바일) */}
          <div className="sticky top-0 z-30 md:hidden">
            <div className="bg-white pt-2.5 pb-2 flex justify-center">
              <div
                style={{
                  width: "44px",
                  height: "5px",
                  borderRadius: "999px",
                  background: "rgba(0,0,0,0.18)",
                }}
              />
            </div>
          </div>

          {/* 헤더: 작은 프로필 + 이름 */}
          <div
            className="relative w-full px-5 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex items-center gap-4"
            style={{
              background: `linear-gradient(135deg, ${accentHex}18 0%, ${accentHex}03 100%)`,
            }}
          >
            <div
              className="relative rounded-full overflow-hidden flex-shrink-0"
              style={{
                width: "72px",
                height: "72px",
                background: `linear-gradient(135deg, ${accentHex}35 0%, ${accentHex}10 100%)`,
                border: `2px solid ${accentHex}55`,
                boxShadow: `0 6px 16px ${accentHex}30`,
              }}
            >
              <Image
                src={host.photoSrc}
                alt={`${host.nameKo} 사회자 프로필 사진`}
                fill
                sizes="72px"
                className="object-cover"
                style={{ objectPosition: host.imageFocus ?? "center 20%" }}
                priority
              />
            </div>

            <div className="flex-1 min-w-0">
              <div
                className="apple-legal uppercase tracking-widest mb-1"
                style={{ color: accentHex, opacity: 0.85, fontWeight: 600 }}
              >
                MC · {String(index + 1).padStart(2, "0")}
                {host.roleLabel ? ` · ${host.roleLabel}` : ""}
              </div>
              <div
                className="apple-card-title"
                style={{
                  color: "var(--apple-ink)",
                  fontSize: "22px",
                  lineHeight: 1.2,
                  fontWeight: 600,
                }}
              >
                {host.nameKo}
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    opacity: 0.55,
                    marginLeft: "6px",
                  }}
                >
                  사회자
                </span>
              </div>
              <div
                className="apple-legal opacity-60 mt-0.5"
                style={{ fontSize: "10px", letterSpacing: "0.5px" }}
              >
                {host.nameEn}
              </div>
            </div>
          </div>

          {/* 본문 */}
          <div className="px-5 md:px-8 pt-4 md:pt-5 pb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {host.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full apple-micro"
                  style={{
                    background: `${accentHex}15`,
                    color: accentHex,
                    fontSize: "11px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bio + 스타일 */}
            <h3
              className="apple-body-emphasis mb-1"
              style={{ fontSize: "15px", lineHeight: 1.4 }}
            >
              {host.bio}
            </h3>
            <div
              className="apple-micro opacity-55 mb-4"
              style={{ fontSize: "12px" }}
            >
              진행 스타일 · {host.style}
            </div>

            {/* 상세 소개 */}
            <p
              className="apple-body opacity-80 mb-7"
              style={{ fontSize: "14.5px", lineHeight: 1.7 }}
            >
              {host.details}
            </p>

            {/* 🎙 음성 샘플 */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-3">
                <div
                  className="apple-control-emphasis uppercase tracking-widest opacity-60"
                  style={{ color: accentHex }}
                >
                  🎙 Voice · 음성 미리듣기
                </div>
              </div>
              <AudioPreviewList
                previews={[
                  {
                    title: `${host.nameKo} 사회자 — 진행 멘트 샘플`,
                    src: host.audioSrc,
                  },
                ]}
                accentHex={accentHex}
                stopToken={stopToken}
              />
            </div>

            {/* 🎬 진행 영상 */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-3">
                <div
                  className="apple-control-emphasis uppercase tracking-widest opacity-60"
                  style={{ color: accentHex }}
                >
                  🎬 Film · 진행 영상
                </div>
                <div className="apple-legal opacity-50">
                  {host.youtubeLinks.length}편
                </div>
              </div>

              {host.youtubeLinks.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {host.youtubeLinks.map((url, i) => (
                    <VideoEmbed
                      key={url}
                      embedUrl={url}
                      label={`Scene ${String(i + 1).padStart(2, "0")}`}
                      accentHex={accentHex}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-[14px] p-5 text-center apple-body opacity-60"
                  style={{ background: "rgba(0,0,0,0.03)" }}
                >
                  진행 영상 준비 중입니다.
                </div>
              )}
            </div>

            {/* 하단 플로팅 CTA spacer */}
            <div style={{ height: "108px" }} aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* === 플로팅 X 닫기 버튼 === */}
      <button
        onClick={handleClose}
        aria-label="닫기"
        style={{
          position: "fixed",
          top: "max(env(safe-area-inset-top), 14px)",
          right: "16px",
          zIndex: 101,
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.96)",
          color: "#1d1d1f",
          backdropFilter: "saturate(180%) blur(14px)",
          WebkitBackdropFilter: "saturate(180%) blur(14px)",
          boxShadow:
            "0 6px 20px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.12)",
          border: "1px solid rgba(0,0,0,0.06)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* === 플로팅 카카오톡 상담 CTA === */}
      <div
        aria-hidden={!visible}
        style={{
          position: "fixed",
          bottom: "max(env(safe-area-inset-bottom), 20px)",
          left: "50%",
          zIndex: 101,
          width: "calc(100% - 32px)",
          maxWidth: "440px",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(30px)",
          transition:
            "opacity 0.3s ease 0.05s, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1) 0.05s",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            boxShadow: "0 0 0 0 rgba(254, 229, 0, 0.55)",
            animation: visible
              ? "kakao-cta-pulse 2.2s ease-out infinite"
              : "none",
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
          <span>{withRo(host.nameKo)} 카카오톡 상담</span>
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
    </>,
    document.body
  );
}
