const container = document.querySelector('.scroll-container');
const sections = document.querySelectorAll('.section');
let currentIndex = 0;
let isAnimating = false;

// Set initial positions
function initializeSections() {
    sections.forEach((section, index) => {
        section.style.transform = `translateY(${index * 100}vh)`;
    });
    container.style.height = `${sections.length * 100}vh`;
}

function scrollToSection(index) {
    if (isAnimating || index < 0 || index >= sections.length) return;
    
    isAnimating = true;
    currentIndex = index;
    container.style.transform = `translateY(-${index * 100}vh)`;
    
    setTimeout(() => {
        isAnimating = false;
    }, 800);
}

// Mouse wheel handler
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    scrollToSection(currentIndex + delta);
});

// Keyboard handler
window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', ' '].includes(e.key)) {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        scrollToSection(currentIndex + direction);
    }
});

// Touch handler
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touchEndY = e.touches[0].clientY;
    const delta = touchStartY - touchEndY;
    
    if (Math.abs(delta) > 50) {
        const direction = delta > 0 ? 1 : -1;
        scrollToSection(currentIndex + direction);
        touchStartY = touchEndY;
    }
}, { passive: false });

// Initialize
initializeSections();