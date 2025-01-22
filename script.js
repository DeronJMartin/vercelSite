const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const navIndicator = document.querySelector('.nav-indicator');
let currentIndex = 0;
let isScrolling = false;

function activateSection(index) {
    // Boundary checks
    if (index < 0 || index >= sections.length) return;
    
    // Update sections
    sections.forEach((section, i) => {
        section.classList.toggle('active', i === index);
    });
    
    // Update navbar
    updateNavIndicator(index);
    currentIndex = index;
}

function updateNavIndicator(index) {
    const activeLink = navLinks[index];
    if (!activeLink) return;

    // Update indicator position
    navIndicator.style.width = `${activeLink.offsetWidth}px`;
    navIndicator.style.left = `${activeLink.offsetLeft}px`;

    // Update active class
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Scroll handler
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    isScrolling = true;

    const direction = e.deltaY > 0 ? 1 : -1;
    const newIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);

    if (newIndex !== currentIndex) {
        activateSection(newIndex);
    }

    setTimeout(() => {
        isScrolling = false;
    }, 800);
});

// Keyboard handler
window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        activateSection(currentIndex + direction);
    }
});

// Nav link click handler
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        activateSection(index);
    });
});

// Initial setup
activateSection(0);