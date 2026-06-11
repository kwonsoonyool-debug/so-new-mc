"use client";

/**
 * VideoEmbed — lite-youtube 패턴
 * 처음엔 YouTube 썸네일 + 재생 버튼만 렌더 → 탭하면 그때 iframe 로드.
 * 사회자 9인 × 영상 3개 = 최대 27개 iframe을 즉시 로드하지 않기 위한 성능 장치.
 */

import { useState } from "react";

/** embed URL에서 비디오 ID 추출: https://www.youtube.com/embed/<id> */
function videoId(embedUrl: string): string {
  const m = embedUrl.match(/\/embed\/([^?/]+)/);
  return m ? m[1] : "";
}

type Props = {
  embedUrl: string;
  label: string;
  accentHex: string;
};

export default function VideoEmbed({ embedUrl, label, accentHex }: Props) {
  const [loaded, setLoaded] = useState(false);
  const id = videoId(embedUrl);

  return (
    <div
      className="relative w-full overflow-hidden rounded-[14px]"
      style={{ aspectRatio: "16 / 9", background: "#000" }}
    >
      {loaded ? (
        <iframe
          src={`${embedUrl}?autoplay=1&rel=0&playsinline=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`${label} 영상 재생`}
          className="group absolute inset-0 w-full h-full"
        >
          {/* YouTube 썸네일 (iframe 없이 이미지만) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={`${label} 썸네일`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-[1.03]"
          />
          {/* 어둡게 + 라벨 */}
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.2) 100%)",
            }}
          />
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full apple-legal uppercase tracking-widest"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: accentHex,
              fontWeight: 700,
              letterSpacing: "1px",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            {label}
          </span>
          {/* 재생 버튼 */}
          <span
            className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full transition-transform group-hover:scale-110"
            style={{
              width: 58,
              height: 58,
              transform: "translate(-50%, -50%)",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#1d1d1f"
              style={{ marginLeft: 3 }}
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
