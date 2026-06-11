"use client";

/**
 * HostsGrid — 사회자 9인 카드 그리드 + 스타일 필터 칩
 * 카드 탭 → HostModal 오픈 + URL 동기화 (?host=슬러그)
 *
 * URL 동기화 규칙:
 * - 열기: history.pushState 로 ?host=슬러그 추가 (embed 등 기존 파라미터 보존)
 * - 닫기: 우리가 push 했으면 history.back(), 직접 ?host= 로 진입한 경우엔 replaceState 로 제거
 * - popstate(뒤로가기): URL 기준으로 모달 상태 복원
 */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CATEGORY_LABELS,
  Host,
  HostCategory,
  HOSTS,
} from "./hosts-data";
import HostModal from "./HostModal";

const ACCENT = "#c9a961";

type Filter = "all" | HostCategory;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "premium", label: CATEGORY_LABELS.premium },
  { key: "warm", label: CATEGORY_LABELS.warm },
  { key: "energetic", label: CATEGORY_LABELS.energetic },
  { key: "stable", label: CATEGORY_LABELS.stable },
];

function hostFromUrl(): Host | null {
  const id = new URLSearchParams(window.location.search).get("host");
  return HOSTS.find((h) => h.id === id) ?? null;
}

function urlWithHost(id: string | null): string {
  const params = new URLSearchParams(window.location.search);
  if (id) params.set("host", id);
  else params.delete("host");
  const qs = params.toString();
  return `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
}

export default function HostsGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeHost, setActiveHost] = useState<Host | null>(null);
  /** 직전 open 이 pushState 였는지 — 닫을 때 back() 할지 결정 */
  const pushedRef = useRef(false);

  // 첫 진입: ?host= 가 있으면 모달 바로 오픈 (공유 링크 / WP 리다이렉트 진입)
  useEffect(() => {
    const initial = hostFromUrl();
    if (initial) {
      setActiveHost(initial);
      pushedRef.current = false; // 직접 진입 — back() 금지
    }

    const onPopState = () => {
      const fromUrl = hostFromUrl();
      pushedRef.current = false;
      setActiveHost(fromUrl);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const openHost = useCallback((host: Host) => {
    setActiveHost(host);
    window.history.pushState(null, "", urlWithHost(host.id));
    pushedRef.current = true;
  }, []);

  const closeHost = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back(); // popstate 가 URL 과 상태를 함께 복원
    } else {
      window.history.replaceState(null, "", urlWithHost(null));
    }
    setActiveHost(null);
  }, []);

  const filtered =
    filter === "all" ? HOSTS : HOSTS.filter((h) => h.category === filter);

  return (
    <section className="chapter-white px-6 py-20 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <div
            className="apple-control-emphasis mb-6 uppercase tracking-widest"
            style={{ color: ACCENT }}
          >
            Our MCs
          </div>
          <h2 className="apple-product md:apple-section mb-4">
            쏘뉴웨딩 파트너 사회자
          </h2>
          <p className="apple-body opacity-70">
            카드를 누르면 음성 샘플과 진행 영상을 바로 확인할 수 있어요.
          </p>
        </div>

        {/* ── 스타일 필터 칩 ── */}
        <div
          className="flex gap-2 mb-8 md:mb-10 md:justify-center overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            margin: "0 -24px 32px",
            padding: "4px 24px",
          }}
          role="tablist"
          aria-label="진행 스타일 필터"
        >
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.key)}
                className="apple-control-emphasis flex-shrink-0 transition-all"
                style={{
                  padding: "8px 18px",
                  borderRadius: "980px",
                  fontSize: "13.5px",
                  background: active ? ACCENT : "transparent",
                  color: active ? "#ffffff" : "var(--apple-text-sec)",
                  border: active
                    ? `1.5px solid ${ACCENT}`
                    : "1.5px solid var(--apple-border-soft)",
                  whiteSpace: "nowrap",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* ── 카드 그리드 ── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {filtered.map((host) => {
            const globalIndex = HOSTS.findIndex((h) => h.id === host.id);
            return (
              <button
                key={host.id}
                type="button"
                onClick={() => openHost(host)}
                className="group bg-[var(--apple-gray)] rounded-[18px] overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.99] text-left"
                aria-label={`${host.nameKo} 사회자 상세 정보 열기`}
              >
                <div
                  className="aspect-[3/4] relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${host.accentHex}35 0%, ${host.accentHex}08 100%)`,
                  }}
                >
                  <Image
                    src={host.photoSrc}
                    alt={`${host.nameKo} 사회자 프로필 사진`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform group-hover:scale-105"
                    style={{ objectPosition: host.imageFocus ?? "center 20%" }}
                    priority={globalIndex < 3}
                  />

                  {/* 카테고리 배지 */}
                  <div
                    className="absolute top-3 left-3 md:top-4 md:left-4 px-2.5 py-1 rounded-full apple-legal z-10"
                    style={{
                      background: "rgba(0,0,0,0.45)",
                      color: "#ffffff",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                    }}
                  >
                    {CATEGORY_LABELS[host.category]}
                  </div>

                  {/* 대표 배지 */}
                  {host.roleLabel && (
                    <div
                      className="absolute top-3 right-3 md:top-4 md:right-4 px-2.5 py-1 rounded-full apple-legal z-10"
                      style={{
                        background: ACCENT,
                        color: "#ffffff",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                      }}
                    >
                      ★ {host.roleLabel}
                    </div>
                  )}

                  {/* 하단 가독성 그라데이션 */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/2 z-10"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                    }}
                  />

                  {/* 이름 오버레이 + Click 배지 */}
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-20">
                    <div
                      className="apple-legal uppercase tracking-widest mb-1 md:mb-2"
                      style={{ color: "#ffffff", opacity: 0.85 }}
                    >
                      {host.nameEn}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div
                        className="apple-card-title"
                        style={{
                          fontSize: "clamp(16px, 4.4vw, 22px)",
                          color: "#ffffff",
                        }}
                      >
                        {host.nameKo}{" "}
                        <span
                          style={{
                            fontSize: "0.62em",
                            fontWeight: 500,
                            opacity: 0.8,
                          }}
                        >
                          사회자
                        </span>
                      </div>
                      <span
                        className="click-attractor inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
                        style={{
                          background: host.accentHex,
                          color: "#ffffff",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          className="click-attractor-ring"
                          aria-hidden="true"
                        />
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ position: "relative", zIndex: 1 }}
                        >
                          <path d="M9 11V6a2 2 0 1 1 4 0v6" />
                          <path d="M13 12V5a2 2 0 1 1 4 0v8" />
                          <path d="M17 14V8a2 2 0 1 1 4 0v8a6 6 0 0 1-6 6h-2a6 6 0 0 1-5.4-3.4L4 13.5a2 2 0 0 1 3-2.5L9 13" />
                        </svg>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          Click
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3 md:mb-4">
                    {host.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 md:px-3 py-1 rounded-full apple-legal"
                        style={{
                          background: `${host.accentHex}15`,
                          color: host.accentHex,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <div
                    className="apple-body-emphasis mb-3 md:mb-4"
                    style={{
                      fontSize: "clamp(13px, 3.4vw, 15px)",
                      lineHeight: "1.4",
                    }}
                  >
                    {host.bio}
                  </div>

                  {/* 진행 스타일 */}
                  <div className="pt-3 md:pt-4 border-t border-[var(--apple-border-soft)]">
                    <div className="apple-legal uppercase tracking-wider mb-1 opacity-50">
                      Style
                    </div>
                    <div
                      className="apple-control-emphasis"
                      style={{ color: host.accentHex }}
                    >
                      {host.style}
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div
                    className="mt-4 md:mt-5 apple-control-emphasis group-hover:underline flex items-center gap-1.5"
                    style={{ color: host.accentHex }}
                  >
                    음성 · 영상 &amp; 상세 보기
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <HostModal
        host={activeHost}
        index={activeHost ? HOSTS.findIndex((h) => h.id === activeHost.id) : -1}
        onClose={closeHost}
      />
    </section>
  );
}
