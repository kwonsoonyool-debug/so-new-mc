// 사회자 데이터
const mcData = [
    {
        id: "kwon-soonyul",
        name: "권순율",
        intro: "쏘뉴웨딩의 대표 사회자",
        details: "따뜻하고 신뢰감 있는 음성으로 신랑신부의 특별한 순간을 완벽하게 이끌어냅니다. 오랜 경험을 바탕으로 어떤 상황에서도 자연스럽고 품격 있는 진행을 선보입니다.",
        style: "고급스럽고 세련된",
        category: "premium",
        mbti: "ENFJ",
        tags: ["#감성적", "#신뢰감", "#프로페셔널"],
        image: null,
        kakaoLink: "#",
        youtubeLinks: [
            "https://www.youtube.com/embed/VIDEO_ID_1?si=",
            "https://www.youtube.com/embed/VIDEO_ID_2?si=",
            "https://www.youtube.com/embed/VIDEO_ID_3?si="
        ]
    },
    {
        id: "cho-hyungyeom",
        name: "조현겸",
        intro: "따뜻하고 친근한 진행으로 유명",
        details: "아늑한 분위기 속에서 신랑신부와 하객을 하나로 만듭니다. 따뜻한 미소와 친근한 말투로 모든 하객이 편안함을 느낄 수 있게 합니다.",
        style: "따뜻하고 친근한",
        category: "warm",
        mbti: "ESFJ",
        tags: ["#감정적", "#친근감", "#따뜻함"],
        image: null,
        kakaoLink: "#",
        youtubeLinks: ["#", "#", "#"]
    },
    {
        id: "shin-donghun",
        name: "신동훈",
        intro: "세련되고 세심한 진행의 베테랑",
        details: "격식 있으면서도 편안한 분위기를 조성하는 베테랑입니다. 수많은 결혼식 경험으로 어떤 돌발 상황도 자연스럽게 처리합니다.",
        style: "세련되고 정중한",
        category: "premium",
        mbti: "ISTJ",
        tags: ["#정중함", "#세련됨", "#베테랑"],
        image: null,
        kakaoLink: "#",
        youtubeLinks: ["#", "#", "#"]
    },
    {
        id: "kim-sunwoo",
        name: "김선우",
        intro: "밝은 에너지와 유머감각의 MC",
        details: "밝고 긍정적인 에너지로 결혼식 분위기를 밝혀줍니다. 센스 있는 유머로 하객들의 웃음을 자아내며 특별한 순간을 만들어냅니다.",
        style: "밝고 활기찬",
        category: "energetic",
        mbti: "ENFP",
        tags: ["#유머감각", "#활기찬", "#긍정적"],
        image: null,
        kakaoLink: "#",
        youtubeLinks: ["#", "#", "#"]
    },
    {
        id: "lee-jaehun",
        name: "이재훈",
        intro: "감정을 섬세하게 담아내는 사회자",
        details: "신랑신부의 감정을 깊이 있게 이해하고 표현합니다. 감동적인 멘트와 섬세한 진행으로 하객 모두의 마음에 남는 결혼식을 만들어드립니다.",
        style: "감성적이고 깊이 있는",
        category: "warm",
        mbti: "INFP",
        tags: ["#감성적", "#섬세함", "#감정표현"],
        image: null,
        kakaoLink: "#",
        youtubeLinks: ["#", "#", "#"]
    },
    {
        id: "lee-hyungyu",
        name: "이현규",
        intro: "안정적이고 신뢰감 있는 전문가",
        details: "묵직하고 믿음직한 목소리로 결혼식의 기품을 지킵니다. 흔들림 없는 진행과 안정적인 존재감으로 신랑신부가 행사에만 집중할 수 있게 합니다.",
        style: "안정적이고 격조 있는",
        category: "stable",
        mbti: "ISFJ",
        tags: ["#신뢰감", "#안정적", "#격조있음"],
        image: null,
        kakaoLink: "#",
        youtubeLinks: ["#", "#", "#"]
    },
    {
        id: "ryu-minwoo",
        name: "류민우",
        intro: "트렌디하고 개성 있는 MC",
        details: "최신 트렌드를 반영한 신선한 멘트와 개성있는 진행입니다. MZ세대 신랑신부들에게 특히 인기 있는 감각적인 스타일을 선보입니다.",
        style: "트렌디하고 신선한",
        category: "energetic",
        mbti: "ESFP",
        tags: ["#트렌디", "#개성있음", "#신선함"],
        image: null,
        kakaoLink: "#",
        youtubeLinks: ["#", "#", "#"]
    },
    {
        id: "park-geunmo",
        name: "박근모",
        intro: "경험 많은 베테랑 사회자",
        details: "수십 년의 경험으로 다져진 능숙한 진행 능력을 가졌습니다. 어떤 상황에서도 당황하지 않는 노련함과 하객을 편안하게 만드는 특유의 분위기가 있습니다.",
        style: "경험 많은 신뢰감 있는",
        category: "stable",
        mbti: "ESTJ",
        tags: ["#경험많음", "#신뢰감", "#프로정신"],
        image: null,
        kakaoLink: "#",
        youtubeLinks: ["#", "#", "#"]
    },
    {
        id: "park-seungbeom",
        name: "박승범",
        intro: "신선하고 활기찬 에너지",
        details: "젊고 활기찬 에너지로 결혼식 분위기를 한층 업그레이드시킵니다. 신선한 아이디어와 무한한 열정으로 잊지 못할 결혼식을 만들어드립니다.",
        style: "신선하고 활력 있는",
        category: "energetic",
        mbti: "ESTP",
        tags: ["#활기찬", "#신선함", "#에너지있음"],
        image: null,
        kakaoLink: "#",
        youtubeLinks: ["#", "#", "#"]
    }
];
