const container = document.querySelector('.scroll-container');
const sections = document.querySelectorAll('.section');
let currentIndex = 0;

// Initialize container and sections
function initialize() {
    container.style.height = `${sections.length * 100}vh`;
    
    sections.forEach((section, index) => {
        section.style.top = `${index * 100}vh`;
    });
}

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    currentIndex = index;
    container.style.transform = `translateY(-${index * 100}vh)`;
}

// Mouse wheel handler
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    const direction = Math.sign(e.deltaY);
    scrollToSection(currentIndex + direction);
});

// Keyboard handler
window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
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
        scrollToSection(currentIndex + Math.sign(delta));
        touchStartY = touchEndY;
    }
}, { passive: false });

// Initialize
initialize();