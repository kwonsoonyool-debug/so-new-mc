import HostsGrid from "./_components/HostsGrid";
import FAQ from "./_components/FAQ";
import Reveal from "./_components/Reveal";

const ACCENT = "#c9a961";
const KAKAO_URL = "https://pf.kakao.com/_BxkaYG/chat";
const TOURNAMENT_URL = "https://sonew-mc-tournament.vercel.app";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        id="hero"
        className="chapter-black relative flex flex-col items-center justify-center px-6 pt-24 pb-20 md:pt-48 md:pb-36 min-h-[88vh] md:min-h-[80vh] scroll-mt-20"
      >
        <div className="apple-legal mb-5 opacity-60 uppercase tracking-widest">
          Sonew Wedding MC
        </div>

        <h1 className="apple-hero-l md:apple-hero-xl text-center mb-6 md:mb-8 max-w-4xl">
          예식의 처음과 끝,
          <br />
          그 흐름을 만드는 목소리.
        </h1>

        <p className="apple-body md:apple-subhead text-center max-w-xl opacity-75 mb-10 md:mb-12">
          검증된 프로페셔널 웨딩 사회자들이
          <br />
          두 분의 가장 빛나는 순간을 이끌어드립니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-pill apple-pill-primary-gold w-full sm:w-auto"
          >
            문의하기
          </a>
          <a
            href="#our-hosts"
            className="apple-pill apple-pill-ghost-light w-full sm:w-auto"
          >
            사회자 보기 &nbsp;›
          </a>
        </div>
      </section>

      {/* ═══════════════════ INTRO ═══════════════════ */}
      <section
        id="intro"
        className="chapter-gray px-6 py-20 md:py-40 scroll-mt-20"
      >
        <Reveal className="max-w-3xl mx-auto text-center">
          <div
            className="apple-control-emphasis mb-6 uppercase tracking-widest"
            style={{ color: ACCENT }}
          >
            Introduction
          </div>

          <h2 className="apple-product md:apple-section mb-8 leading-tight">
            사회자가 바뀌면
            <br />
            예식 전체가 달라집니다.
          </h2>

          <p className="apple-body md:apple-subhead opacity-80 leading-relaxed">
            쏘뉴웨딩은 검증된 프로페셔널 웨딩 사회자들과 함께합니다.
            <br />
            목소리·진행력·현장 대응력을 모두 갖춘 이들이,
            <br />
            두 분의 이야기에 가장 어울리는 예식을 완성합니다.
          </p>
        </Reveal>
      </section>

      {/* ═══════════════════ TOURNAMENT BANNER ═══════════════════ */}
      <section className="chapter-black px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12 md:mb-16">
            <div
              className="apple-control-emphasis mb-5 uppercase tracking-widest"
              style={{ color: ACCENT }}
            >
              사회자 이상형 월드컵
            </div>
            <h2 className="apple-product md:apple-section mb-5 leading-tight">
              사회자 프로필만 봐서는
              <br />
              목소리를 고르기 어렵죠.
            </h2>
            <p className="apple-body opacity-70 max-w-xl mx-auto">
              실제 진행 음성을 1:1로 들으며 비교하는 이상형 월드컵입니다.
              <br className="hidden md:block" />
              끝까지 이기는 목소리가 두 분에게 가장 잘 맞는 사회자입니다.
            </p>
          </Reveal>

          {/* 3단계 흐름 */}
          <Reveal className="grid grid-cols-3 gap-3 md:gap-6 mb-12 md:mb-14">
            {[
              { step: "01", icon: "🎙️", label: "음성 듣기", desc: "두 사회자의 실제 진행 음성을 재생" },
              { step: "02", icon: "⚡", label: "1:1 투표", desc: "더 마음에 드는 목소리에 투표" },
              { step: "03", icon: "🏆", label: "최종 1인", desc: "모든 대결을 이긴 내 취향의 사회자 확인" },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[18px] p-4 md:p-7 text-center"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="text-2xl md:text-3xl mb-3">{item.icon}</div>
                <div className="apple-legal uppercase tracking-widest mb-2 opacity-50" style={{ color: ACCENT }}>
                  Step {item.step}
                </div>
                <div className="apple-body-emphasis mb-1.5" style={{ fontSize: "14px" }}>{item.label}</div>
                <div className="apple-micro opacity-50 leading-relaxed hidden md:block">{item.desc}</div>
              </div>
            ))}
          </Reveal>

          <Reveal className="text-center">
            <p className="apple-micro opacity-40 mb-8">무료 · 로그인 불필요 · 약 2분 소요</p>
            <a
              href={TOURNAMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: ACCENT,
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "17px",
                padding: "18px 40px",
                borderRadius: "980px",
                boxShadow: `0 8px 32px ${ACCENT}55`,
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "22px" }}>🏆</span>
              <span aria-label="사회자 이상형 월드컵 하러 가기">
                {"사회자 이상형 월드컵 하러 가기".split("").map((char, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      animation: char === " " ? "none" : "letter-bounce 1.2s ease-in-out infinite",
                      animationDelay: `${i * 0.06}s`,
                    }}
                  >{char}</span>
                ))}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "3px",
                  background: "#1d1d1f",
                  color: ACCENT,
                  borderRadius: "980px",
                  padding: "3px 9px 3px 6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  animation: "click-flash 1.6s ease-in-out infinite",
                  position: "relative",
                }}
              >
                <span style={{ animation: "click-flash 1.6s ease-in-out infinite", display: "inline-block" }}>✦</span>
                Click
              </span>
            </a>
            <style>{`
              @keyframes letter-bounce {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-6px); }
              }
              @keyframes click-flash {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.35; }
              }
            `}</style>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ HOSTS GRID ═══════════════════ */}
      <div id="our-hosts" className="scroll-mt-20">
        <HostsGrid />
      </div>

      {/* ═══════════════════ PROCESS ═══════════════════ */}
      <section
        id="process"
        className="chapter-white px-6 py-20 md:py-36 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12 md:mb-16">
            <div
              className="apple-control-emphasis mb-6 uppercase tracking-widest"
              style={{ color: ACCENT }}
            >
              The Process
            </div>
            <h2 className="apple-product md:apple-section mb-4">섭외 프로세스</h2>
            <p className="apple-body opacity-70">
              네 단계로 완성되는 사회자 섭외.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { step: "01", title: "섭외 문의", desc: "카카오톡 상담" },
              { step: "02", title: "설문 작성", desc: "두 분의 이야기 수집" },
              {
                step: "03",
                title: "스크립트 수정",
                desc: "매직키트 기반 맞춤 대본",
              },
              { step: "04", title: "예식 진행", desc: "당일 현장 진행" },
            ].map((item, i) => (
              <Reveal
                key={item.step}
                delay={i * 80}
                className="bg-[var(--apple-gray)] rounded-[18px] p-5 md:p-8 text-center transition-transform hover:scale-[1.02]"
              >
                <div
                  className="apple-legal uppercase tracking-widest mb-4 opacity-60"
                  style={{
                    color: i === 3 ? ACCENT : "var(--apple-text-sec)",
                  }}
                >
                  Step {item.step}
                </div>
                <div
                  className="apple-feature mb-2 md:mb-3"
                  style={{
                    color: i === 3 ? ACCENT : "var(--apple-ink)",
                    fontSize: "clamp(28px, 6vw, 38px)",
                  }}
                >
                  {["I", "II", "III", "IV"][i]}
                </div>
                <div className="apple-body-emphasis mb-1">{item.title}</div>
                <div className="apple-micro opacity-60">{item.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CLOSING (신뢰·안심 클로징) ═══════════════════ */}
      <section className="chapter-gray px-6 py-20 md:py-36">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div
              className="apple-control-emphasis mb-6 uppercase tracking-widest"
              style={{ color: ACCENT }}
            >
              Final Step
            </div>
            <h2 className="apple-product md:apple-section mb-6 leading-tight">
              결정하시기 전,
              <br />꼭 알려드리고 싶은 것
            </h2>
            <p className="apple-body opacity-70 max-w-xl mx-auto">
              결혼식은 단 한 번. 쏘뉴웨딩은 그 무게를 그대로 지킵니다.
            </p>
          </div>

          {/* 안심 포인트 4가지 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-12 md:mb-16">
            {[
              {
                tag: "검증된 파트너",
                title: "검증된 사회자만",
                desc: "쏘뉴웨딩이 목소리·진행력·현장 대응력을 직접 확인한 사회자만 소개합니다. 예식장에서 처음 보는 사회자는 없습니다.",
              },
              {
                tag: "맞춤 스크립트",
                title: "두 분의 이야기로 만든 대본",
                desc: "설문으로 모은 두 분의 이야기를 매직키트 기반 스크립트에 녹여냅니다. 어디서나 듣는 진행 멘트가 아닌, 두 분만의 예식이 됩니다.",
              },
              {
                tag: "예식 안정성",
                title: "일정 충돌 사전 차단",
                desc: "쏘뉴 운영 시스템에서 예식 일정을 우선 확정합니다. 갑작스러운 일정 변경·이중 예약은 발생하지 않습니다.",
              },
              {
                tag: "사후 책임",
                title: "당일까지 함께",
                desc: "예식 전 리허설부터 본식 진행까지 운영팀이 상시 대기. 식순 변경 같은 현장 변수도 함께 잡습니다.",
              },
            ].map((item, i) => (
              <Reveal
                key={i}
                delay={i * 80}
                className="rounded-[22px] md:rounded-[28px] p-6 md:p-10"
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--apple-border-soft)",
                }}
              >
                <div
                  className="apple-legal uppercase tracking-widest mb-4"
                  style={{ color: ACCENT }}
                >
                  {String(i + 1).padStart(2, "0")} · {item.tag}
                </div>
                <div
                  className="apple-card-title mb-3"
                  style={{ fontSize: "22px" }}
                >
                  {item.title}
                </div>
                <div className="apple-body opacity-75 leading-relaxed">
                  {item.desc}
                </div>
              </Reveal>
            ))}
          </div>

          {/* 상담 클로징 카드 */}
          <div
            className="rounded-[22px] md:rounded-[28px] p-7 md:p-14"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, rgba(201,169,97,0.06) 100%)",
              border: `1px solid ${ACCENT}55`,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
              {/* LEFT: 메시지 */}
              <div>
                <div
                  className="apple-legal uppercase tracking-widest mb-4"
                  style={{ color: ACCENT }}
                >
                  Ready to Book
                </div>
                <h3 className="apple-product mb-5 leading-tight">
                  섭외는 카카오톡 상담 후
                  <br />
                  최종 확정됩니다.
                </h3>
                <ul className="space-y-3 mb-2">
                  {[
                    "1. 카카오톡으로 예식 일자·예식장 전달",
                    "2. 가능한 사회자 후보 및 조건 안내",
                    "3. 사회자 확정 후 설문 작성 · 스크립트 준비",
                    "4. 예식 당일 진행",
                  ].map((line, i) => (
                    <li
                      key={i}
                      className="apple-body opacity-80 flex items-start gap-3"
                    >
                      <span
                        style={{
                          color: ACCENT,
                          fontWeight: 600,
                          minWidth: "8px",
                        }}
                      >
                        ·
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="apple-micro opacity-50 mt-5">
                  ※ 비용은 사회자·시즌·예식 조건에 따라 상담 시 안내드립니다.
                </div>
              </div>

              {/* RIGHT: CTA */}
              <div className="text-center lg:text-right">
                <div
                  className="apple-legal uppercase tracking-widest mb-3 opacity-60"
                  style={{ color: ACCENT }}
                >
                  지금 상담
                </div>
                <div className="apple-body opacity-70 mb-6">
                  평균 1분 이내 · 즉시 답변
                </div>
                <div className="flex flex-col gap-3 items-center lg:items-end">
                  <a
                    href={KAKAO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apple-pill apple-pill-primary-gold w-full md:w-auto"
                  >
                    카카오톡 상담 시작하기 &nbsp;›
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <div id="faq" className="scroll-mt-20">
        <FAQ />
      </div>

      {/* ═══════════════════ EPILOGUE ═══════════════════ */}
      <section className="chapter-white px-6 py-20 md:py-36">
        <Reveal className="max-w-2xl mx-auto text-center">
          <div className="apple-legal uppercase tracking-widest mb-8 md:mb-10 opacity-50">
            — Epilogue —
          </div>
          <p className="apple-product md:apple-section mb-8 md:mb-10 leading-tight">
            한 번뿐인 예식을
            <br />
            가장 믿을 수 있는 목소리로.
          </p>
          <div className="apple-body opacity-70 mb-8 md:mb-10">
            쏘뉴웨딩의 사회자들이 함께합니다.
          </div>
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-pill apple-pill-primary-gold inline-flex"
          >
            문의하기
          </a>
        </Reveal>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="chapter-black px-6 py-16 text-center">
        <div className="apple-legal uppercase tracking-widest opacity-50">
          Sonew &nbsp;·&nbsp; Official MC Partners
        </div>
      </footer>
    </main>
  );
}
