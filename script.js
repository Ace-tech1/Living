// ============================================================
// CRESTONE LIVING — script.js (upgraded)
// This replaces your existing script.js. All your original
// behavior (AOS, smooth scroll, nav highlighting, accordion,
// fade-in observer, mobile menu, review widget) is kept as-is —
// new premium features are added below each original block.
// ============================================================

// Animation
AOS.init({
    duration: 1200,
    once: true,
    offset: 200,
    easing: 'ease',
    delay: 40,
    throttleDelay: 99
});

// smooth scrolling
var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800,
    easing: 'easeInOutCubic',
    updateURL: false,
    offset: 0,
    callback: function (anchor, toggle) { }
});

// nav.
document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isCurrentlyActive = header.classList.contains('active');

            document.querySelectorAll('.accordion-header.active').forEach(openHeader => {
                openHeader.classList.remove('active');
                openHeader.nextElementSibling.style.maxHeight = null;
            });

            if (!isCurrentlyActive) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});

// Animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.js-fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.01
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// menu icon
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
});

// Review widget
document.addEventListener('DOMContentLoaded', () => {
    const reviewTab = document.getElementById('reviewTab');
    const reviewFormPopup = document.getElementById('reviewFormPopup');
    const body = document.body;

    if (reviewTab && reviewFormPopup) {
        reviewTab.addEventListener('click', function () {
            reviewFormPopup.classList.toggle('active');
            if (reviewFormPopup.classList.contains('active')) {
                body.classList.add('modal-open');
            } else {
                body.classList.remove('modal-open');
            }
        });

        document.addEventListener('click', function (event) {
            if (!reviewFormPopup.contains(event.target) && !reviewTab.contains(event.target)) {
                reviewFormPopup.classList.remove('active');
                body.classList.remove('modal-open');
            }
        });
    }
});


// ============================================================
// NEW — PREMIUM UPGRADE FEATURES
// ============================================================

// ---------- Preloader ----------
document.addEventListener('DOMContentLoaded', () => {
    let preloader = document.getElementById('site-preloader');
    if (!preloader) {
        preloader = document.createElement('div');
        preloader.id = 'site-preloader';
        preloader.innerHTML = '<div class="preloader-mark"></div>';
        document.body.prepend(preloader);
    }
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('loaded'), 300);
    });
    // safety fallback in case 'load' is slow
    setTimeout(() => preloader.classList.add('loaded'), 2500);
});

// ---------- Scroll progress bar ----------
document.addEventListener('DOMContentLoaded', () => {
    let bar = document.getElementById('scroll-progress');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'scroll-progress';
        document.body.appendChild(bar);
    }
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
});

// ---------- Custom drafting-pin cursor (desktop only) ----------
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        document.body.classList.add('cursor-ready');
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const growTargets = 'a, button, .accordion-header, input, textarea, select, .review-tab';
    document.querySelectorAll(growTargets).forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('cursor-grow'));
        el.addEventListener('mouseleave', () => ring.classList.remove('cursor-grow'));
    });
});

// ---------- Magnetic buttons ----------
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const magnets = document.querySelectorAll(
        '.btn1, .btn2, .btn3, .btn4, .sbtn1, .sbtn2, .pbtn, .send-message-btn, .schedule-call-btn, .galleryb'
    );

    magnets.forEach(el => {
        el.classList.add('magnetic-active');
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
});

// ---------- Count-up stat numbers ----------
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.metric-number');
    if (!counters.length) return;

    const runCount = (el) => {
        const raw = el.textContent.trim();
        const match = raw.match(/[\d.]+/);
        if (!match) return;
        const target = parseFloat(match[0]);
        const suffix = raw.replace(match[0], '');
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCount(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
});

// ---------- Page transition wipe + internal link handling ----------
document.addEventListener('DOMContentLoaded', () => {
    let wipe = document.getElementById('page-wipe');
    if (!wipe) {
        wipe = document.createElement('div');
        wipe.id = 'page-wipe';
        document.body.appendChild(wipe);
    }

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
            return;
        }
        link.addEventListener('click', function (event) {
            event.preventDefault();
            wipe.classList.add('active');
            setTimeout(() => {
                window.location.href = link.href;
            }, 550);
        });
    });
});

// ---------- Subtle hero parallax on mousemove (desktop only) ----------
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;

    const heroSelectors = '.hero-image, .services-hero, .portfoliobg, .about-hero, .contactimg, .gallery, .videogallery';
    const heroes = document.querySelectorAll(heroSelectors);
    if (!heroes.length) return;

    heroes.forEach(hero => {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 6;
            const y = (e.clientY / window.innerHeight - 0.5) * 6;
            hero.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
        });
        hero.addEventListener('mouseleave', () => {
            hero.style.backgroundPosition = '50% 50%';
        });
    });
});

// ---------- Portfolio filter bar ----------
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;

    const categories = document.querySelectorAll('.portfolio-category');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            categories.forEach(cat => {
                if (filter === 'all' || cat.classList.contains(filter)) {
                    cat.classList.remove('pc-hidden');
                } else {
                    cat.classList.add('pc-hidden');
                }
            });
        });
    });
});

// ---------- Staggered card reveal ----------
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.portfolio-item, .gallery-item, .team-card, .value-card');
    if (!cards.length) return;

    cards.forEach(card => {
        const siblingIndex = Array.from(card.parentElement.children).indexOf(card);
        card.style.setProperty('--i', siblingIndex);
    });

    const cardObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-in');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(c => cardObserver.observe(c));
});

// ---------- Cursor "view" label on portfolio cards ----------
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const cards = document.querySelectorAll('.portfolio-item, .gallery-item');
    if (!cards.length) return;

    const label = document.createElement('div');
    label.className = 'pi-follow-label';
    label.textContent = 'View';
    document.body.appendChild(label);

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => label.classList.add('show'));
        card.addEventListener('mouseleave', () => label.classList.remove('show'));
        card.addEventListener('mousemove', (e) => {
            label.style.left = e.clientX + 'px';
            label.style.top = e.clientY + 'px';
        });
    });
});

// ---------- Portfolio lightbox (with counter + spotlight trigger) ----------
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.portfolio-item, .gallery-item');
    if (!items.length) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const spotlightBtn = document.querySelector('.spotlight-view');

    const itemList = Array.from(items);
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const item = itemList[currentIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('.pi-title');
        const category = item.querySelector('.pi-category');

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = category && title
            ? `${category.textContent} — ${title.textContent}`
            : '';
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentIndex + 1} / ${itemList.length}`;
        }

        lightbox.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    function showNext(step) {
        currentIndex = (currentIndex + step + itemList.length) % itemList.length;
        openLightbox(currentIndex);
    }

    itemList.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if (spotlightBtn) {
        spotlightBtn.addEventListener('click', () => {
            const idx = parseInt(spotlightBtn.getAttribute('data-index'), 10) || 0;
            openLightbox(idx);
        });
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => showNext(-1));
    nextBtn.addEventListener('click', () => showNext(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showNext(-1);
        if (e.key === 'ArrowRight') showNext(1);
    });

    // basic touch swipe support
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    lightbox.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) showNext(dx < 0 ? 1 : -1);
    });
});

// ---------- Before / after slider ----------
document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.getElementById('baWrap');
    if (!wrap) return;

    const afterWrap = document.getElementById('baAfterWrap');
    const afterImg = document.getElementById('baAfterImg');
    const handle = document.getElementById('baHandle');

    function syncWidth() {
        afterImg.style.width = wrap.offsetWidth + 'px';
    }
    syncWidth();
    window.addEventListener('resize', syncWidth);

    function setPosition(pct) {
        pct = Math.max(0, Math.min(100, pct));
        afterWrap.style.width = pct + '%';
        handle.style.left = pct + '%';
    }
    setPosition(50);

    let dragging = false;

    function moveTo(clientX) {
        const rect = wrap.getBoundingClientRect();
        const pct = ((clientX - rect.left) / rect.width) * 100;
        setPosition(pct);
    }

    handle.addEventListener('mousedown', (e) => { dragging = true; e.preventDefault(); });
    window.addEventListener('mouseup', () => dragging = false);
    window.addEventListener('mousemove', (e) => { if (dragging) moveTo(e.clientX); });

    handle.addEventListener('touchstart', () => dragging = true, { passive: true });
    window.addEventListener('touchend', () => dragging = false);
    window.addEventListener('touchmove', (e) => {
        if (dragging) moveTo(e.touches[0].clientX);
    }, { passive: true });

    wrap.addEventListener('click', (e) => {
        if (handle.contains(e.target)) return;
        moveTo(e.clientX);
    });
});

// ---------- Video gallery: click-to-play (one video at a time) ----------
document.addEventListener('DOMContentLoaded', () => {
    const videoItems = document.querySelectorAll('.video-item[data-yt]');
    if (!videoItems.length) return;

    videoItems.forEach(item => {
        const thumb = item.querySelector('.video-thumb');
        if (!thumb) return;

        thumb.addEventListener('click', () => {
            const videoId = item.getAttribute('data-yt');
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
            iframe.title = 'YouTube video player';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';

            item.innerHTML = '';
            item.appendChild(iframe);
        });
    });
});

// ---------- Curtain reveal for story/vision/mission images ----------
document.addEventListener('DOMContentLoaded', () => {
    const wraps = document.querySelectorAll('.img-reveal-wrap');
    if (!wraps.length) return;

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    wraps.forEach(w => revealObserver.observe(w));
});

// ---------- Web3Forms submit handling (contact form + review form) ----------
// Both forms submit in the background via fetch instead of a full page POST,
// so there's no jarring redirect to web3forms' own bare success page.
// On success, the visitor is sent to a branded thank-you.html page.
document.addEventListener('DOMContentLoaded', () => {
    function wireWeb3Form(formId, statusId, thankYouParams) {
        const form = document.getElementById(formId);
        if (!form) return;

        const status = document.getElementById(statusId);
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (status) {
                status.classList.remove('show', 'error');
                status.textContent = '';
            }
            const originalBtnText = submitBtn ? submitBtn.textContent : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            try {
                const formData = new FormData(form);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });
                const result = await response.json();

                if (result.success) {
                    window.location.href = `./thank-you.html?${thankYouParams}`;
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (err) {
                if (status) {
                    status.textContent = "Something went wrong — please try again, or reach out to us directly.";
                    status.classList.add('show', 'error');
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            }
        });
    }

    wireWeb3Form('contactForm', 'contactFormStatus', 'type=enquiry');
    wireWeb3Form('reviewForm', 'reviewFormStatus', 'type=review');
});

// ---------- Thank-you page: customize heading/message by submission type ----------
document.addEventListener('DOMContentLoaded', () => {
    const heading = document.getElementById('thankyouHeading');
    const message = document.getElementById('thankyouMessage');
    if (!heading || !message) return;

    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');

    if (type === 'review') {
        heading.textContent = 'Thanks for the Review!';
        message.textContent = "We really appreciate you taking the time to share your experience with us.";
    } else if (type === 'enquiry') {
        heading.textContent = 'Message Received';
        message.textContent = "Thanks for reaching out — we'll get back to you within 24 hours.";
    }
});