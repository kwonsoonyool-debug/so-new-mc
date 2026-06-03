const categoryLabels = {
    premium:   '고급·세련',
    warm:      '따뜻·감성',
    energetic: '밝고·활기',
    stable:    '안정·신뢰'
};

function renderMCCards(filter) {
    const grid = document.getElementById('mc-grid');
    const noResults = document.getElementById('no-results');

    const list = (!filter || filter === 'all')
        ? mcData
        : mcData.filter(mc => mc.category === filter);

    grid.innerHTML = '';

    if (list.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';
    list.forEach(mc => grid.appendChild(createMCCard(mc)));
}

function createMCCard(mc) {
    const card = document.createElement('div');
    card.className = 'mc-card';
    card.onclick = () => openMCModal(mc);

    // 이미지
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'mc-card-image-wrapper';
    if (mc.image) {
        const img = document.createElement('img');
        img.src = mc.image;
        img.alt = mc.name;
        img.className = 'mc-card-image';
        imgWrapper.appendChild(img);
    } else {
        imgWrapper.innerHTML = '<div class="placeholder-image">📸</div>';
    }
    card.appendChild(imgWrapper);

    // 텍스트
    const content = document.createElement('div');
    content.className = 'mc-card-content';

    const header = document.createElement('div');
    header.className = 'mc-card-header';

    const name = document.createElement('span');
    name.className = 'mc-card-name';
    name.textContent = mc.name;
    header.appendChild(name);

    if (mc.category && categoryLabels[mc.category]) {
        const badge = document.createElement('span');
        badge.className = `mc-card-category-badge badge-${mc.category}`;
        badge.textContent = categoryLabels[mc.category];
        header.appendChild(badge);
    }
    content.appendChild(header);

    const style = document.createElement('p');
    style.className = 'mc-card-style';
    style.textContent = mc.style;
    content.appendChild(style);

    const intro = document.createElement('p');
    intro.className = 'mc-card-intro';
    intro.textContent = mc.intro;
    content.appendChild(intro);

    const cta = document.createElement('div');
    cta.className = 'mc-card-cta';
    cta.textContent = '자세히 보기';
    content.appendChild(cta);

    card.appendChild(content);
    return card;
}

function openMCModal(mc) {
    const modal = document.getElementById('mc-modal');

    document.getElementById('modal-name').textContent = mc.name;
    document.getElementById('modal-style').textContent = mc.style;
    document.getElementById('modal-mbti').textContent = mc.mbti || '';

    const tagsEl = document.getElementById('modal-tags');
    tagsEl.textContent = mc.tags ? mc.tags.join('  ') : '';

    document.getElementById('modal-details').textContent = mc.details;

    const ctaLink = document.getElementById('modal-cta');
    ctaLink.href = mc.kakaoLink;
    ctaLink.textContent = `${mc.name} 사회자로 상담하기`;

    // 프로필 사진
    const mcImage = document.getElementById('modal-mc-image');
    if (mc.image) {
        mcImage.innerHTML = `<img src="${mc.image}" alt="${mc.name}">`;
    } else {
        mcImage.innerHTML = '📸';
    }

    // 유튜브 갤러리
    const hasVideos = mc.youtubeLinks && mc.youtubeLinks.length > 0;
    const youtubeGallery = document.getElementById('youtube-gallery');
    const youtubeContainer = document.getElementById('youtube-container');

    if (hasVideos) {
        youtubeContainer.innerHTML = '';
        mc.youtubeLinks.slice(0, 3).forEach(link => {
            const div = document.createElement('div');
            div.className = 'youtube-video';
            if (link && link !== '#') {
                const iframe = document.createElement('iframe');
                iframe.src = link;
                iframe.allowFullscreen = true;
                div.appendChild(iframe);
            } else {
                div.innerHTML = '<div class="youtube-placeholder">🎬</div>';
            }
            youtubeContainer.appendChild(div);
        });
        youtubeGallery.style.display = 'block';
    } else {
        youtubeGallery.style.display = 'none';
    }

    document.getElementById('modal-body').scrollTop = 0;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMCModal() {
    document.getElementById('mc-modal').classList.remove('active');
    document.body.style.overflow = '';
}

function handleModalBackdrop(e) {
    if (e.target === e.currentTarget) closeMCModal();
}

document.addEventListener('DOMContentLoaded', () => {
    // 필터 칩
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            renderMCCards(chip.dataset.filter);
        });
    });

    // ESC 닫기
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMCModal();
    });

    renderMCCards('all');
});
