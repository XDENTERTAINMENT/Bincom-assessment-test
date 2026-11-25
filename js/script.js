const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const navLinks = [...nav.querySelectorAll('a')];
const sections = navLinks.map(link => document.querySelector(link.hash));
const desktop = window.matchMedia('(min-width: 48rem)');

document.querySelector('#year').textContent = new Date().getFullYear();
menuButton.hidden = false;

function setMenuOpen(open) {
    menuButton.setAttribute('aria-expanded', String(open));
}

menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') === 'false');
});

header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuButton.focus();
    }
});

desktop.addEventListener('change', () => setMenuOpen(false));

for (const link of navLinks) {
    link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        setMenuOpen(false);
        document.querySelector(link.hash).focus({ preventScroll: true });
    });
}

function updateActiveSection() {
    const readingLine = header.offsetHeight + Math.min(window.innerHeight * 0.22, 160);
    const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
    let current = sections[0];

    for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section;
    }
    if (atPageEnd) {
        // Near the footer, an anchor can be visible even if it cannot scroll up to the header.
        const anchor = sections.find(section => '#' + section.id === window.location.hash);
        const anchorTop = anchor?.getBoundingClientRect().top;
        current = anchorTop >= header.offsetHeight && anchorTop < window.innerHeight
            ? anchor
            : sections[sections.length - 1];
    }

    for (const link of navLinks) {
        if (link.hash === '#' + current.id) {
            link.setAttribute('aria-current', 'location');
        } else {
            link.removeAttribute('aria-current');
        }
    }
}

// Group scroll updates so the active navigation state changes at most once per frame.
let pendingFrame = 0;
function scheduleActiveSection() {
    if (pendingFrame) return;

    pendingFrame = requestAnimationFrame(() => {
        pendingFrame = 0;
        updateActiveSection();
    });
}

window.addEventListener('scroll', scheduleActiveSection, { passive: true });
window.addEventListener('resize', scheduleActiveSection);
window.addEventListener('hashchange', scheduleActiveSection);
window.addEventListener('pageshow', scheduleActiveSection);
updateActiveSection();

const lightbox = document.querySelector('#lightbox');
const photoLinks = [...document.querySelectorAll('.gallery-grid a')];
const lightboxImage = lightbox.querySelector('img');
const caption = lightbox.querySelector('figcaption');
const photoCount = document.querySelector('#photo-count');
let photoIndex = 0;
let openingLink;

function showPhoto(index) {
    photoIndex = (index + photoLinks.length) % photoLinks.length;
    const link = photoLinks[photoIndex];
    const description = link.querySelector('img').alt;

    lightboxImage.src = link.href;
    caption.textContent = description;
    photoCount.textContent = (photoIndex + 1) + ' / ' + photoLinks.length;
}

if (typeof lightbox.showModal === 'function') {
    photoLinks.forEach((link, index) => {
        link.addEventListener('click', event => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            event.preventDefault();
            openingLink = link;
            showPhoto(index);
            lightbox.showModal();
        });
    });

    document.querySelector('#previous-photo').addEventListener('click', () => showPhoto(photoIndex - 1));
    document.querySelector('#next-photo').addEventListener('click', () => showPhoto(photoIndex + 1));

    lightbox.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            showPhoto(photoIndex + (event.key === 'ArrowLeft' ? -1 : 1));
        }
    });

    lightbox.addEventListener('close', () => openingLink?.focus());
}
