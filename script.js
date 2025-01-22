const sections = document.querySelectorAll('.section');
let currentIndex = 0;
let isScrolling = false;

function activateSection(index) {
    sections.forEach((section, i) => {
        section.classList.remove('active');
        if(i === index) {
            section.classList.add('active');
        }
    });
}

window.addEventListener('wheel', (e) => {
    if(isScrolling) return;
    isScrolling = true;

    const direction = e.deltaY > 0 ? 1 : -1;
    const newIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);

    if(newIndex !== currentIndex) {
        currentIndex = newIndex;
        activateSection(currentIndex);
    }

    setTimeout(() => {
        isScrolling = false;
    }, 800);
});

window.addEventListener('keydown', (e) => {
    if(['ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        window.dispatchEvent(new WheelEvent('wheel', { deltaY: direction * 100 }));
    }
});

// Initialize first section
activateSection(0);