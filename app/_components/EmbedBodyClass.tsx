"use client";

import { useEmbedMode } from "./useEmbedMode";
import { useEffect } from "react";

/**
 * iframe 임베드 모드일 때 <body>에 .embed-mode 클래스를 부착.
 * 전역 CSS에서 main padding 등을 조정할 수 있게 함.
 */
export default function EmbedBodyClass() {
  const embed = useEmbedMode();

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (embed) {
      document.body.classList.add("embed-mode");
    } else {
      document.body.classList.remove("embed-mode");
    }
    return () => {
      document.body.classList.remove("embed-mode");
    };
  }, [embed]);

  return null;
}
