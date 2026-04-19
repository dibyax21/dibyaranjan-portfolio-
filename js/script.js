document.addEventListener('DOMContentLoaded', () => {
    // 1. Professional Neural Mesh + Liquid Glow Background
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let nodes = [];
    const nodeCount = 60;
    const maxDistance = 180;
    let mouse = { x: null, y: null };

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    resize();

    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Mouse interaction (repel)
            if (mouse.x && mouse.y) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    this.x += dx * 0.01;
                    this.y += dy * 0.01;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(124, 58, 237, 0.4)';
            ctx.fill();
        }
    }

    const init = () => {
        nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node());
        }
    };

    const draw = () => {
        // Subtle background trail for smooth motion
        ctx.fillStyle = 'rgba(5, 5, 8, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].update();
            nodes[i].draw();

            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(124, 58, 237, ${0.15 * (1 - dist / maxDistance)})`;
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    };

    init();
    draw();

    // 2. Custom Cursor (Premium Smooth)
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        cursorDot.style.left = `${x}px`;
        cursorDot.style.top = `${y}px`;
        
        cursorOutline.animate({
            left: `${x}px`,
            top: `${y}px`
        }, { duration: 500, fill: "forwards" });
    });

    // 3. Scroll Reveal Logic (Enhanced Intersection Observer)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. Typing Effect
    class TxtType {
        constructor(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        }

        tick() {
            let i = this.loopNum % this.toRotate.length;
            let fullTxt = this.toRotate[i];
            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
            this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;
            let delta = 200 - Math.random() * 100;
            if (this.isDeleting) delta /= 2;
            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }
            setTimeout(() => this.tick(), delta);
        }
    }

    document.querySelectorAll('.typewrite').forEach(el => {
        const toRotate = el.getAttribute('data-type');
        const period = el.getAttribute('data-period');
        if (toRotate) new TxtType(el, JSON.parse(toRotate), period);
    });

    // 5. Slider Navigation
    const track = document.getElementById('projects-track');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');
    
    if (track && prevBtn && nextBtn) {
        let index = 0;
        const updateSlider = () => {
            const card = track.querySelector('.project-card');
            if (!card) return;
            const cardWidth = card.offsetWidth + 30;
            track.style.transform = `translateX(-${index * cardWidth}px)`;
            prevBtn.style.opacity = index === 0 ? '0.3' : '1';
            prevBtn.style.pointerEvents = index === 0 ? 'none' : 'all';
            const visibleCards = window.innerWidth > 1100 ? 3 : (window.innerWidth > 768 ? 2 : 1);
            const maxIndex = track.querySelectorAll('.project-card').length - visibleCards;
            nextBtn.style.opacity = index >= maxIndex ? '0.3' : '1';
            nextBtn.style.pointerEvents = index >= maxIndex ? 'none' : 'all';
        };

        nextBtn.addEventListener('click', () => {
            const visibleCards = window.innerWidth > 1100 ? 3 : (window.innerWidth > 768 ? 2 : 1);
            if (index < track.querySelectorAll('.project-card').length - visibleCards) {
                index++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                index--;
                updateSlider();
            }
        });

        window.addEventListener('resize', updateSlider);
        setTimeout(updateSlider, 500);
    }
});
