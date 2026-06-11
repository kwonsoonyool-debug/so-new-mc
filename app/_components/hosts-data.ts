/**
 * Sonew Wedding MC — 사회자 9인 데이터
 * 원본: sonew-mc-tournament/app/_data/mcs.ts (실데이터) + so-new-mc 프로토타입 카테고리 체계
 * 가격(priceManwon)은 보유만 하고 UI에는 노출하지 않음 (카톡 문의 유도 전략)
 */

export type Preview = {
  title: string;
  src: string;
};

export type HostCategory = "premium" | "warm" | "energetic" | "stable";

export const CATEGORY_LABELS: Record<HostCategory, string> = {
  premium: "고급 · 세련",
  warm: "따뜻 · 감성",
  energetic: "밝고 · 활기",
  stable: "안정 · 신뢰",
};

export type Host = {
  /** URL 동기화용 슬러그 — 기존 워드프레스 이니셜 패턴(/lhg/, /rmw/)과 일치 */
  id: string;
  nameKo: string;
  nameEn: string;
  mbti: string;
  /** 한 줄 소개 (카드) */
  bio: string;
  /** 상세 소개 (모달) */
  details: string;
  /** 진행 스타일 요약 */
  style: string;
  category: HostCategory;
  tags: string[];
  /** 음성 샘플 (진행 멘트 미리듣기) */
  audioSrc: string;
  photoSrc: string;
  /** UI 비노출 — 내부 참고용 */
  priceManwon?: number;
  roleLabel?: string;
  /** 카드(3:4) crop 시 얼굴 보정 — CSS object-position */
  imageFocus?: string;
  /** 진행 영상 (YouTube embed URL, SCENE 01~) */
  youtubeLinks: string[];
  accentHex: string;
};

export const KAKAO_URL = "https://pf.kakao.com/_BxkaYG/chat";
export const TOURNAMENT_URL = "https://sonew-mc-tournament.vercel.app";

export const HOSTS: Host[] = [
  {
    id: "lhg",
    nameKo: "이현규",
    nameEn: "LEE · HYUN · GYU",
    mbti: "INFP",
    bio: "예식장에 향기를 입히는 감성 스토리텔러.",
    details:
      "한 편의 시처럼 스며드는 나레이션. 식장 출신 노하우 위에 따뜻하고 진심 어린 멘트를 얹어 가슴 뭉클한 순간을 만들어드립니다.",
    style: "감성 나레이션 · 따뜻한 톤",
    category: "warm",
    tags: ["#따뜻한톤", "#감성충만", "#마음울림", "#식장출신"],
    audioSrc: "/audio/mc-01.m4a",
    photoSrc: "/photos/mc-01.jpg",
    priceManwon: 18.9,
    imageFocus: "center 20%",
    youtubeLinks: [
      "https://www.youtube.com/embed/e_atzbp07Y4",
      "https://www.youtube.com/embed/sOuhyhcwUGE",
      "https://www.youtube.com/embed/HBbMJb3ZrM8",
    ],
    accentHex: "#c9a961",
  },
  {
    id: "rmw",
    nameKo: "류민우",
    nameEn: "RYU · MIN · WOO",
    mbti: "ENFJ",
    bio: "예식의 텐션을 설계하는 최고의 분위기 메이커.",
    details:
      "현장을 깨우는 에너지 톤과 하객에게 꽂히는 명확한 딕션. 식장 출신의 탄탄한 경험으로 변수에도 흔들리지 않는 칼 같은 진행을 선보입니다.",
    style: "에너지 톤 · 현장 장악력",
    category: "energetic",
    tags: ["#밝은톤", "#식장출신", "#열정넘침", "#명확딕션"],
    audioSrc: "/audio/mc-02.m4a",
    photoSrc: "/photos/mc-02.png",
    priceManwon: 18.9,
    imageFocus: "center 15%",
    youtubeLinks: [
      "https://www.youtube.com/embed/CGmk9PrPd2w",
      "https://www.youtube.com/embed/CFf2qGenJYA",
      "https://www.youtube.com/embed/swQBfv18FZU",
    ],
    accentHex: "#b89a55",
  },
  {
    id: "pgm",
    nameKo: "박근모",
    nameEn: "PARK · GEUN · MO",
    mbti: "INFJ",
    bio: "진심을 연기하는 목소리, 예식의 깊이를 더하는 아티스트.",
    details:
      "라디오 DJ 같은 감성 보이스와 배우 출신의 무대 장악력. 두 분의 서사를 가장 아름답게 빚어내어 대본을 넘어선 감동을 만들어드립니다.",
    style: "감성 보이스 · 배우 출신",
    category: "warm",
    tags: ["#감성보이스", "#배우출신", "#우아한진행", "#스토리텔링"],
    audioSrc: "/audio/mc-03.m4a",
    photoSrc: "/photos/mc-03.jpg",
    priceManwon: 14.9,
    imageFocus: "center 20%",
    youtubeLinks: [
      "https://www.youtube.com/embed/D1o2tAmi3Ac",
      "https://www.youtube.com/embed/kR-1AUqyBNA",
      "https://www.youtube.com/embed/3loqVc1bayg",
    ],
    accentHex: "#d4b872",
  },
  {
    id: "ljh",
    nameKo: "이재훈",
    nameEn: "LEE · JAE · HOON",
    mbti: "ESTP",
    bio: "결혼식 전체를 조용히 조율하는 균형형 리더.",
    details:
      "차분하고 단정한 목소리로 품격과 안정감을 부여합니다. 부드럽고 매끄럽게 흘러가는 진행으로 어떤 변수에도 흔들리지 않는 침착한 전문가입니다.",
    style: "차분 단정 · 안정적 진행",
    category: "stable",
    tags: ["#차분단정", "#매끄러운진행", "#검증된신뢰", "#균형감"],
    audioSrc: "/audio/mc-04.m4a",
    photoSrc: "/photos/mc-04.jpg",
    priceManwon: 16.9,
    imageFocus: "center 20%",
    youtubeLinks: [
      "https://www.youtube.com/embed/_mWcUpb8cIE",
      "https://www.youtube.com/embed/yrE2digD9wg",
      "https://www.youtube.com/embed/RwdPptknU38",
    ],
    accentHex: "#b0a070",
  },
  {
    id: "psb",
    nameKo: "박승범",
    nameEn: "PARK · SEUNG · BEOM",
    mbti: "ENTP",
    bio: "결혼식을 생기 있고 유쾌하게 만드는 에너지형 퍼포머.",
    details:
      "재치와 위트로 공간을 웃음으로 채우는 분위기 메이커. 매력적인 목소리 톤과 호감 가는 비주얼, 전속 경험으로 단련된 현장 감각까지 갖췄습니다.",
    style: "유쾌 재치 · 밝은 에너지",
    category: "energetic",
    tags: ["#유쾌재치", "#밝은이미지", "#비주얼호감", "#순발력"],
    audioSrc: "/audio/mc-05.m4a",
    photoSrc: "/photos/mc-05.jpg",
    priceManwon: 14.9,
    imageFocus: "center 20%",
    youtubeLinks: [
      "https://www.youtube.com/embed/XQZzWs-iYqA",
      "https://www.youtube.com/embed/BSgdHgbPV6Q",
      "https://www.youtube.com/embed/O4j9TNuGtSw",
    ],
    accentHex: "#e0c685",
  },
  {
    id: "ksw",
    nameKo: "김선우",
    nameEn: "KIM · SEON · WOO",
    mbti: "ESTJ",
    bio: "중저음의 안정감과 진중한 품격으로 예식의 격을 높입니다.",
    details:
      "깊이감 있는 중저음으로 예식장의 공기를 묵직하게 채웁니다. 식장 출신의 깔끔한 진행과 군더더기 없는 딕션으로 결혼식의 격을 한 단계 끌어올립니다.",
    style: "중저음 · 진중한 품격",
    category: "premium",
    tags: ["#중저음", "#식장출신", "#진중한품격", "#깔끔진행"],
    audioSrc: "/audio/mc-06.m4a",
    photoSrc: "/photos/mc-06.png",
    priceManwon: 16.9,
    imageFocus: "center 15%",
    youtubeLinks: [
      "https://www.youtube.com/embed/IcDSwyl-57s",
      "https://www.youtube.com/embed/V_-c--87ZqE",
      "https://www.youtube.com/embed/ifiOs08_PpE",
    ],
    accentHex: "#a89058",
  },
  {
    id: "sdh",
    nameKo: "신동훈",
    nameEn: "SHIN · DONG · HOON",
    mbti: "ISTP",
    bio: "예식의 품격과 안정감을 보장하는 신뢰형 사회자.",
    details:
      "전속 예식장 출신의 현장 감각과 깔끔한 딕션. 분위기를 해치지 않는 절제된 유머로 품격과 온기를 함께 얹어드립니다.",
    style: "담백 깔끔 · 신뢰형",
    category: "stable",
    tags: ["#전속출신", "#현장감", "#절제된유머", "#침착대응"],
    audioSrc: "/audio/mc-07.m4a",
    photoSrc: "/photos/mc-07.jpg",
    priceManwon: 20.9,
    imageFocus: "center 20%",
    youtubeLinks: [
      "https://www.youtube.com/embed/t4exh0y-ZEo",
      "https://www.youtube.com/embed/G371yXZhuq8",
      "https://www.youtube.com/embed/zO63vO0Q1ls",
    ],
    accentHex: "#c2a55e",
  },
  {
    id: "jhg",
    nameKo: "조현겸",
    nameEn: "JO · HYUN · GYEOM",
    mbti: "ENFP",
    bio: "결혼식의 분위기 메이커, 밝지만 과하지 않은 진행자.",
    details:
      "1000만 관객 영화 「서울의 봄」 출연 뮤지컬 배우 출신. 또렷한 발성과 딱딱하지 않은 부드러움, 재치 있는 임기응변으로 밝고 명확한 예식을 완성합니다.",
    style: "뮤지컬 배우 출신 · 밝고 명확",
    category: "energetic",
    tags: ["#뮤지컬배우출신", "#뚜렷한발성", "#부드러움", "#유쾌재치"],
    audioSrc: "/audio/mc-08.m4a",
    photoSrc: "/photos/mc-08.png",
    priceManwon: 20.9,
    imageFocus: "center 18%",
    youtubeLinks: [
      "https://www.youtube.com/embed/PBHJhRHwDOA",
      "https://www.youtube.com/embed/1jwn2u2D9CU",
      "https://www.youtube.com/embed/zyvrEcz17qA",
    ],
    accentHex: "#d8bc78",
  },
  {
    id: "ksy",
    nameKo: "권순율",
    nameEn: "KWON · SOON · YOOL",
    mbti: "ENFP",
    bio: "목소리·진행력·신뢰감, 세 가지를 모두 갖춘 대표 사회자.",
    details:
      "양가 부모님이 가장 좋아하는 진중하고 우아한 진행. 쏘뉴웨딩의 얼굴로서 고급스럽고 격조 있는 예식의 중심을 잡아드립니다.",
    style: "진중하고 우아한 · 대표",
    category: "premium",
    tags: ["#대표사회자", "#진중정중", "#양가부모님픽", "#검증된신뢰"],
    audioSrc: "/audio/mc-09.m4a",
    photoSrc: "/photos/mc-09.jpg",
    priceManwon: 25.9,
    roleLabel: "대표",
    imageFocus: "center 20%",
    youtubeLinks: [
      "https://www.youtube.com/embed/GCF8xjQyg_4",
      "https://www.youtube.com/embed/p0zsvxqV7qo",
      "https://www.youtube.com/embed/PAxgErxxya4",
    ],
    accentHex: "#c9a961",
  },
];
