"use client";

import { useState } from "react";

const ACCENT = "#c9a961";

type FAQItem = {
  q: string;
  a: string;
};

const FAQS: FAQItem[] = [
  {
    q: "사회자 비용은 어떻게 되나요?",
    a: "비용은 사회자·시즌·예식 조건에 따라 달라져서, 카카오톡으로 예식 일자와 예식장을 알려주시면 가능한 사회자 후보와 함께 정확한 견적을 바로 안내드려요 😊 평균 1분 이내로 답변드립니다.",
  },
  {
    q: "쏘뉴웨딩 축가 가수와 함께 섭외할 수도 있나요?",
    a: "네, 가능합니다! 사회자와 축가 가수를 함께 섭외하시면 축가 단가가 더 저렴해지고, 같은 팀이 사전에 호흡을 맞추기 때문에 예식 전체의 흐름이 훨씬 매끄러워져요. 곡 진입 타이밍과 감정 전달에도 일관성이 생긴답니다 😊",
  },
  {
    q: "스크립트는 어떻게 준비되나요?",
    a: "섭외 확정 후 두 분의 이야기를 담는 설문을 보내드려요. 작성해 주신 내용을 바탕으로 매직키트 기반 스크립트를 두 분 맞춤으로 수정하고, 예식 전까지 함께 다듬어갑니다. 어디서나 듣는 진행 멘트가 아닌, 두 분만의 예식이 됩니다 😊",
  },
  {
    q: "결제는 어떻게 진행되나요?",
    a: "섭외 확정 후 별도 안내에 따라 결제가 일괄로 진행됩니다. 결제 방법과 절차는 상담 시 친절히 안내드리니 너무 걱정하지 않으셔도 돼요 😊 계산서 발행이 필요하시면 사전에 말씀해 주세요.",
  },
  {
    q: "지방 예식도 가능한가요?",
    a: "아쉽게도 지방 예식은 어렵습니다 🥲 현재 서울과 경기 지역만 진행 가능하며, 서울은 추가 비용 없이 진행되고 경기 지역은 예식장 위치에 따라 출장비가 별도로 발생합니다. 정확한 금액은 카카오톡으로 예식장 주소를 알려주시면 친절히 안내드릴게요 😊",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="chapter-gray px-6 py-28 md:py-36">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="apple-control-emphasis mb-6 uppercase tracking-widest"
            style={{ color: ACCENT }}
          >
            FAQ
          </div>
          <h2 className="apple-product md:apple-section mb-4">자주 묻는 질문</h2>
          <p className="apple-body opacity-70">
            섭외 전에 가장 많이 받는 질문들입니다.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-[18px] overflow-hidden transition-all"
                style={{
                  boxShadow: isOpen
                    ? "0 8px 30px rgba(0,0,0,0.06)"
                    : "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 md:px-8 md:py-6 text-left transition-colors hover:bg-[var(--apple-gray)]"
                  style={{
                    background: isOpen ? "transparent" : "transparent",
                  }}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span
                      className="apple-legal uppercase tracking-widest pt-1.5 opacity-50"
                      style={{ color: ACCENT, minWidth: "24px" }}
                    >
                      Q{String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="apple-body-emphasis"
                      style={{ fontSize: "17px", lineHeight: "1.4" }}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      color: isOpen ? ACCENT : "var(--apple-text-sec)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "all 0.3s",
                      flexShrink: 0,
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <div
                  className="overflow-hidden transition-all"
                  style={{
                    maxHeight: isOpen ? "500px" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    className="px-6 pb-6 md:px-8 md:pb-8"
                    style={{ paddingLeft: "calc(1.5rem + 24px + 1rem)" }}
                  >
                    <div
                      className="apple-body opacity-75"
                      style={{ lineHeight: "1.7" }}
                    >
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="apple-body opacity-60 mb-4">
            더 궁금하신 점이 있으신가요?
          </p>
          <a
            href="https://pf.kakao.com/_BxkaYG/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="apple-link-gold apple-body-emphasis"
            style={{ color: ACCENT }}
          >
            카카오톡으로 문의하기 &nbsp;›
          </a>
        </div>
      </div>
    </section>
  );
}
