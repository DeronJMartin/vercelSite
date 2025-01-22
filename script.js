const sections = document.querySelectorAll('.section');
let currentIndex = 0;
let isScrolling = false;

function updateSections() {
    sections.forEach((section, index) => {
        section.classList.remove('active');
        if (index === currentIndex) {
            section.classList.add('active');
        }
    });
}

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isScrolling) return;
    
    isScrolling = true;
    const delta = Math.sign(e.deltaY);
    const newIndex = delta > 0 ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < sections.length) {
        currentIndex = newIndex;
        updateSections();
    }

    setTimeout(() => {
        isScrolling = false;
    }, 1000);
});

window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', ' '].includes(e.key)) {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < sections.length) {
            currentIndex = newIndex;
            updateSections();
        }
    }
});

// Initialize first section
updateSections();