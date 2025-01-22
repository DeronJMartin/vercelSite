const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const navIndicator = document.querySelector('.nav-indicator');
let currentIndex = 0;
let isScrolling = false;
let activeNavLink = document.querySelector('.nav-link.active');

function activateSection(index) {
    sections.forEach((section, i) => {
        section.classList.remove('active');
        if(i === index) section.classList.add('active');
    });
    updateNavIndicator(index);
}

function updateNavIndicator(index) {
    const activeLink = document.querySelector(`.nav-link:nth-of-type(${index + 1})`);
    if (!activeLink) return;
    
    // Update indicator position
    navIndicator.style.width = `${activeLink.offsetWidth}px`;
    navIndicator.style.left = `${activeLink.offsetLeft}px`;
    
    // Update active class
    activeNavLink.classList.remove('active');
    activeLink.classList.add('active');
    activeNavLink = activeLink;
}

// Wheel scroll handler
window.addEventListener('wheel', (e) => {
    if(isScrolling) return;
    isScrolling = true;

    const direction = e.deltaY > 0 ? 1 : -1;
    const newIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);

    if(newIndex !== currentIndex) {
        currentIndex = newIndex;
        activateSection(currentIndex);
    }

    setTimeout(() => isScrolling = false, 800);
});

// Keyboard navigation
window.addEventListener('keydown', (e) => {
    if(['ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        currentIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);
        activateSection(currentIndex);
    }
});

// Nav link click handlers
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = index;
        activateSection(currentIndex);
    });
});

// Initialize
activateSection(0);
window.addEventListener('DOMContentLoaded', () => updateNavIndicator(0));