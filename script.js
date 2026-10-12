const openBtn = document.getElementById('openAboutBtn');
const closeBtn = document.getElementById('closeAboutBtn');
const modal = document.getElementById('aboutModal');

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// optional: close if click outside in areas
window.addEventListener('click', (event) => {
    if(event.target === modal) {
        modal.style.display = 'none';
    }
});