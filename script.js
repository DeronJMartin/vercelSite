const sections = Array.from(document.querySelectorAll('.section'));
let currentSection = 0;
let isScrolling = false;

// Initialize section positions
window.addEventListener('DOMContentLoaded', () => {
    sections.forEach((section, index) => {
        if (index !== 0) {
            section.style.transform = `translateY(${index * 100}vh)`;
        }
    });
});

// Handle wheel events
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    isScrolling = true;
    const direction = e.deltaY > 0 ? 1 : -1;
    const nextSection = Math.min(Math.max(currentSection + direction, 0), sections.length - 1);
    
    if (nextSection !== currentSection) {
        sections.forEach((section, index) => {
            section.style.transform = `translateY(-${nextSection * 100}vh)`;
        });
        currentSection = nextSection;
    }
    
    setTimeout(() => { isScrolling = false; }, 800);
});

// Keyboard navigation
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        window.dispatchEvent(new WheelEvent('wheel', { deltaY: direction }));
    }
});