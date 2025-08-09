// Interactive elements and animations
document.addEventListener('DOMContentLoaded', function() {
    // Add pixelated cursor effect
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.addEventListener('click', function() {
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Add hover effects to skill icons
    const skillIcons = document.querySelectorAll('.skill-icon');
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Add click effect to timeline circles
    const timelineCircles = document.querySelectorAll('.timeline-circle');
    timelineCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            this.style.background = '#0066CC';
            this.style.color = 'white';
            setTimeout(() => {
                this.style.background = '#f0f0f0';
                this.style.color = '#333';
            }, 1000);
        });
    });

    // Add typing effect to name
    const name = document.querySelector('.name');
    if (name) {
        const originalText = name.textContent;
        name.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                name.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Add sparkle animation to crown
    const crown = document.querySelector('.crown');
    if (crown) {
        setInterval(() => {
            crown.style.transform = 'rotate(5deg)';
            setTimeout(() => {
                crown.style.transform = 'rotate(-5deg)';
            }, 300);
        }, 3000);
    }

    // Add hover effect to portfolio section
    const portfolioSection = document.querySelector('.portfolio-section');
    if (portfolioSection) {
        portfolioSection.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        portfolioSection.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Add click effect to QR code
    const qrCode = document.querySelector('.qr-code');
    if (qrCode) {
        qrCode.addEventListener('click', function() {
            this.style.transform = 'rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }

    // Add parallax effect to background
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.body.style.backgroundPosition = `${moveX}px ${moveY}px`;
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});
