// app.js
document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌓 Toggle Theme';
    darkModeToggle.className = 'button';
    document.querySelector('.nav-links').appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Upvote System
    document.querySelectorAll('.upvote-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const counter = e.target.querySelector('.vote-count');
            counter.textContent = parseInt(counter.textContent) + 1;
        });
    });

    // Tabbed Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            document.querySelector(e.target.getAttribute('href')).style.display = 'block';
        });
    });

    // Basic Form Handling
    document.getElementById('new-post-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log('New post:', Object.fromEntries(formData)); // Replace with API call
        e.target.reset();
    });
});

// Local Storage Integration
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Example usage for discussions
const discussions = loadFromStorage('discussions');

document.getElementById('new-post-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPost = {
        title: formData.get('title'),
        content: formData.get('content'),
        timestamp: new Date().toISOString()
    };
    
    discussions.push(newPost);
    saveToStorage('discussions', discussions);
    renderDiscussions();
});

function renderDiscussions() {
    const container = document.getElementById('discussions');
    container.innerHTML = discussions.map(post => `
        <div class="card">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p class="text-meta">${new Date(post.timestamp).toLocaleString()}</p>
        </div>
    `).join('');
}
