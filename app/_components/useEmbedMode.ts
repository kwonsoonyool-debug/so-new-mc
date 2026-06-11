"use client";

import { useEffect, useState } from "react";

/**
 * iframe 임베드 모드 감지.
 * URL에 ?embed=1 이 있거나, window가 부모 frame에 임베드된 경우 true.
 * 워드프레스 등 외부 사이트에 iframe으로 끼워넣었을 때 내장 헤더/CTA를 숨기는 데 사용.
 */
export function useEmbedMode(): boolean {
  const [embed, setEmbed] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qsEmbed =
        params.get("embed") === "1" || params.get("embed") === "true";
      const inIframe = window.self !== window.top;
      setEmbed(qsEmbed || inIframe);
    } catch {
      // cross-origin frame 접근 차단 시 window.top 에러 → 임베드로 간주
      setEmbed(true);
    }
  }, []);

  return embed;
}
