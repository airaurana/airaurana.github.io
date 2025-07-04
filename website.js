// Matrix rain effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Initial setup
function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setupCanvas();

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

// Adjust fontSize based on device
const isMobile = window.innerWidth <= 768;
const fontSize = isMobile ? 10 : 12;
const columns = Math.floor(canvas.width / fontSize);

// Adjust drop density based on device performance
const dropDensity = isMobile ? 0.985 : 0.970; // Higher value = fewer drops

// Initialize drops
const drops = [];
for(let x = 0; x < columns; x++) {
    drops[x] = Math.floor(Math.random() * canvas.height / fontSize);
}

// FPS control for better performance on mobile
const targetFPS = isMobile ? 20 : 20;
const frameDelay = 1000 / targetFPS;

function draw() {
    // Semi-transparent fade effect (adjusted for better visibility)
    ctx.fillStyle = isMobile ? 'rgba(10, 10, 10, 0.04)' : 'rgba(10, 10, 10, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px Courier New';

    for(let i = 0; i < drops.length; i++) {
        // Skip some columns on mobile for better performance
        if (isMobile && i % 2 === 0 && Math.random() > 0.8) continue;
        
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if(drops[i] * fontSize > canvas.height && Math.random() > dropDensity) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Use requestAnimationFrame for smoother animation with FPS control
let lastTime = 0;
function animate(currentTime) {
    const deltaTime = currentTime - lastTime;
    
    if (deltaTime >= frameDelay) {
        lastTime = currentTime - (deltaTime % frameDelay);
        draw();
    }
    
    requestAnimationFrame(animate);
}

// Start animation
requestAnimationFrame(animate);

// Handle window resize efficiently with debounce
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        setupCanvas();
        // Recalculate columns and adjust drops array
        const newColumns = Math.floor(canvas.width / fontSize);
        
        // Add new columns if needed
        if (newColumns > drops.length) {
            for (let x = drops.length; x < newColumns; x++) {
                drops[x] = Math.floor(Math.random() * canvas.height / fontSize);
            }
        }
    }, 200);
});

// Entry animation for sections
document.addEventListener('DOMContentLoaded', () => {
    // Animate the header first
    const header = document.querySelector('.header');
    if (header) {
        header.style.animation = 'fadeIn 0.8s ease-out forwards';
    }
    
    // Staggered animation for sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        // Create a staggered delay
        const delay = 0.3 + (index * 0.15);
        
        // Set the animation with delay
        section.style.animation = `fadeIn 0.8s ease-out ${delay}s forwards`;
    });
      // Animate social links with subtle stagger
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
        const delay = 0.9 + (index * 0.1);
        link.style.opacity = '0';
        link.style.animation = `fadeInLeft 0.5s ease-out ${delay}s forwards`;
    });
    
    // Animate project cards with a cascade effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const delay = 1.2 + (index * 0.1);
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.6s ease-out ${delay}s forwards`;
    });
});