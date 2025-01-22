const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const navIndicator = document.querySelector('.nav-indicator');
let currentIndex = 0;
let lastScrollTime = 0;
let wheelTimeout = null;

function activateSection(index) {
    index = Math.max(0, Math.min(index, sections.length - 1));
    
    sections.forEach((section, i) => {
        section.classList.toggle('active', i === index);
    });
    
    updateNavIndicator(index);
    currentIndex = index;
}

function updateNavIndicator(index) {
    const activeLink = navLinks[index];
    navIndicator.style.width = `${activeLink.offsetWidth}px`;
    navIndicator.style.left = `${activeLink.offsetLeft}px`;
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

window.addEventListener('wheel', (e) => {
    const now = Date.now();
    const delta = Math.sign(e.deltaY);
    
    // Throttle trackpad scroll events
    if (now - lastScrollTime < 800) return;
    
    // Cancel previous timeout
    if (wheelTimeout) clearTimeout(wheelTimeout);
    
    // Apply immediate scroll lock
    lastScrollTime = now;
    wheelTimeout = setTimeout(() => {
        lastScrollTime = 0;
    }, 800);

    activateSection(currentIndex + delta);
});

window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        activateSection(currentIndex + (e.key === 'ArrowDown' ? 1 : -1));
    }
});

navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        activateSection(index);
    });
});

// Initialize
activateSection(0);