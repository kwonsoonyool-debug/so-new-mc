"use client";

import { useEffect, useRef, useState } from "react";
import type { Preview } from "./hosts-data";

type Props = {
  previews: Preview[];
  accentHex: string;
  /** 외부에서 강제 정지 토큰을 흘려주면 그 변화에 맞춰 멈춤 (모달 닫힘 등) */
  stopToken?: unknown;
};

export default function AudioPreviewList({
  previews,
  accentHex,
  stopToken,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0); // 0~1
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // 외부 신호로 강제 정지 — 초기 마운트(stopToken === undefined)에는 실행 안 함
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    setActiveIdx(null);
    setProgress(0);
    setCurrentTime(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopToken]);

  // unmount 시 정지
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  function handleToggle(idx: number) {
    const audio = audioRef.current;
    if (!audio) return;

    if (activeIdx === idx) {
      // 같은 곡 재토글
      if (audio.paused) {
        audio.play().catch((err) => {
          console.warn("[Audio] resume failed:", err);
        });
      } else {
        audio.pause();
      }
      return;
    }

    // 다른 곡으로 전환
    audio.pause();
    audio.src = previews[idx].src;
    audio.currentTime = 0;
    audio.load(); // src 변경 후 명시적 로드
    setActiveIdx(idx);
    setProgress(0);
    setCurrentTime(0);

    // canplay 후 재생 (메타 로드 전에 play 호출하면 일부 모바일에서 실패)
    const onCanPlay = () => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.play().catch((err) => {
        console.warn("[Audio] play failed:", err, previews[idx].src);
        setActiveIdx(null);
      });
    };
    audio.addEventListener("canplay", onCanPlay);

    // 빠른 즉시 시도 (이미 캐시된 경우 canplay가 안 뜰 수도)
    audio.play().catch(() => {
      /* canplay 핸들러에서 다시 시도됨 */
    });
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(duration, ratio * duration));
  }

  return (
    <div className="flex flex-col gap-2">
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setCurrentTime(a.currentTime);
          if (a.duration) setProgress(a.currentTime / a.duration);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          setActiveIdx(null);
          setProgress(0);
          setCurrentTime(0);
        }}
        onPause={() => {
          // 일시정지 자체는 activeIdx 유지 — 다시 ▶로 재토글 가능
        }}
      />

      {previews.map((p, i) => {
        const isActive = activeIdx === i;
        const isPlaying =
          isActive && audioRef.current ? !audioRef.current.paused : false;
        return (
          <div
            key={i}
            className="rounded-[14px] p-3 md:p-4 flex items-center gap-3"
            style={{
              background: isActive ? `${accentHex}10` : "rgba(0,0,0,0.03)",
              border: isActive
                ? `1px solid ${accentHex}55`
                : "1px solid transparent",
              transition: "background 0.2s ease, border-color 0.2s ease",
            }}
          >
            <button
              onClick={() => handleToggle(i)}
              aria-label={isPlaying ? "정지" : "재생"}
              className="flex items-center justify-center rounded-full transition-transform active:scale-95"
              style={{
                width: 52,
                height: 52,
                flexShrink: 0,
                background: accentHex,
                color: "#fff",
                boxShadow: `0 6px 16px ${accentHex}55`,
                border: "2px solid rgba(255,255,255,0.9)",
              }}
            >
              {isPlaying ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ marginLeft: 3 }}
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div
                className="apple-body-emphasis truncate"
                style={{ fontSize: "14px", lineHeight: 1.3 }}
              >
                {p.title}
              </div>
              {isActive && (
                <div className="mt-2">
                  <div
                    onClick={handleSeek}
                    className="relative w-full cursor-pointer"
                    style={{
                      height: 4,
                      borderRadius: 999,
                      background: "rgba(0,0,0,0.08)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${progress * 100}%`,
                        background: accentHex,
                        borderRadius: 999,
                        transition: "width 0.1s linear",
                      }}
                    />
                  </div>
                  <div
                    className="flex justify-between mt-1.5 apple-legal opacity-60"
                    style={{ fontSize: "11px" }}
                  >
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
