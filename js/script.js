/**
 * Dibyaranjan Nayak — Portfolio Interactive Logic
 * Lightweight, accessible, zero-dependency JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Menu
    const navToggle = document.getElementById('nav-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    if (navToggle && primaryNav) {
        const toggleMenu = (open) => {
            const isOpen = typeof open === 'boolean' ? open : !primaryNav.classList.contains('open');
            primaryNav.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        };

        navToggle.addEventListener('click', () => toggleMenu());

        // Close on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (primaryNav.classList.contains('open')) {
                    toggleMenu(false);
                }
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (primaryNav.classList.contains('open') &&
                !primaryNav.contains(e.target) &&
                !navToggle.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
                toggleMenu(false);
                navToggle.focus();
            }
        });
    }

    // 2. Header Scrolled State
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 3. ScrollSpy: Active Section Highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 4. Project Technical Details Database
    const projectDetails = {
        examguard: {
            title: "ExamGuard AI",
            category: "AI Proctoring / Multimodal AI",
            content: `
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">THE PROBLEM</h4>
                    <p>Remote examinations face continuous integrity challenges, but heavy-handed automated proctoring systems often issue blanket disqualifications based on unreliable heuristics, inflicting false positives and stress on test takers.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">WHAT WAS BUILT</h4>
                    <p>ExamGuard AI is an automated exam monitoring architecture engineered around multimodal signal ingestion, timestamped evidence logging, and an audit dashboard built specifically for human proctor verification. It collects indicators rather than executing automated convictions.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">HOW IT WORKS</h4>
                    <p>Computer vision feeds examine eye-gaze deviation, face orientation, presence continuity, and multi-face anomalies. When behavioral anomaly thresholds are reached, the system captures snapshot frames and telemetry logs, tagging them for human review.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">KEY TECHNOLOGIES</h4>
                    <p>Python, OpenCV, Computer Vision, Edge Telemetry, REST APIs, Streamlit / Web Interface.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">DEVELOPMENT STATUS</h4>
                    <p>Core vision pipelines prototyped; currently evaluating detector confidence across varied lighting conditions and webcam hardware.</p>
                </div>
            `
        },
        saern: {
            title: "SAERN — Swarm AI Emergency Response Network",
            category: "AI / Emergency Response / Multi-Agent Systems",
            content: `
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">THE PROBLEM</h4>
                    <p>During large-scale emergency situations, centralized dispatch systems encounter communication bottlenecks and delayed resource allocation across dynamic crisis zones.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">SYSTEM ARCHITECTURE</h4>
                    <p>SAERN models autonomous swarm agents that interact and coordinate dynamically. Individual agents evaluate local telemetry, prioritize distress reports, and synchronize resource distribution without relying solely on a single failure point.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">TECH STACK & DEPLOYMENT</h4>
                    <p>Python, Multi-Agent Swarm Logic, Docker Containerization, Hugging Face Spaces deployment.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">CODE ACCESS</h4>
                    <p>Public repository available at <a href="https://github.com/dibyax21/SAERN" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: underline;">github.com/dibyax21/SAERN</a>.</p>
                </div>
            `
        },
        devassistant: {
            title: "Multi-Agent Developer Assistant (NexusAI)",
            category: "Agentic AI / Developer Tools",
            content: `
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">THE PROBLEM</h4>
                    <p>Single-turn LLM code generation often suffers from architectural oversights, subtle syntax bugs, and a lack of verification before code is handed to the engineer.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">MULTI-AGENT COLLABORATION</h4>
                    <p>NexusAI implements a 3-agent pipeline:
                    <br>&bull; <strong>Planner Agent:</strong> Breaks user requirements into architectural specs.
                    <br>&bull; <strong>Coder Agent:</strong> Implements modular, idiomatic code adhering to the plan.
                    <br>&bull; <strong>Debugger Agent:</strong> Reviews syntax, security risks, and optimization bottlenecks.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">TECH STACK</h4>
                    <p>Python 3.10+, FastAPI, Uvicorn, OpenAI SDK / Intelligent Fallback Simulator, Tailwind CSS, Vanilla JS, Highlight.js.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">CODE ACCESS</h4>
                    <p>Full project source code is accessible at <a href="https://github.com/dibyax21/multi-agent-dev-assistant-web" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: underline;">github.com/dibyax21/multi-agent-dev-assistant-web</a>.</p>
                </div>
            `
        },
        assistant: {
            title: "Personal AI Assistant",
            category: "AI Assistant / Automation",
            content: `
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">THE PROBLEM</h4>
                    <p>Developers frequently lose flow context navigating between browser search tabs, terminal windows, and repetitive operating system utilities.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">WHAT WAS BUILT</h4>
                    <p>A voice-driven Python application that listens for natural speech commands, queries intelligent language models for information, and triggers automated OS scripts (opening apps, managing files, system monitoring).</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">TECH STACK</h4>
                    <p>Python, SpeechRecognition, Pyttsx3 / TTS, OS automation modules, LLM APIs.</p>
                </div>
            `
        },
        attendance: {
            title: "Computer Vision Attendance System",
            category: "Computer Vision",
            content: `
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">THE PROBLEM</h4>
                    <p>Manual roll calls and magnetic card scanners are slow and vulnerable to proxy attendance, while simple camera feeds can be spoofed using printed photos or phone screens.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">WHAT WAS BUILT</h4>
                    <p>A real-time facial recognition pipeline augmented with anti-spoofing and liveness heuristics. The system detects user presence, verifies identity against local facial encodings, and logs timestamped check-ins to structured records.</p>
                </div>
                <div class="modal-spec-section">
                    <h4 class="modal-spec-heading">TECH STACK</h4>
                    <p>Python, OpenCV, Face Recognition libraries, Real-time video stream processing, Data Logging.</p>
                </div>
            `
        }
    };

    // 5. Project Modal Controller
    const projectModal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-project-title');
    const modalBody = document.getElementById('modal-body');

    const openProjectModal = (projectId) => {
        const data = projectDetails[projectId];
        if (!data || !projectModal) return;

        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;

        projectModal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        modalCloseBtn.focus();
    };

    const closeProjectModal = () => {
        if (!projectModal) return;
        projectModal.setAttribute('hidden', '');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.open-project-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-project');
            openProjectModal(id);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // 6. Resume Modal Controller
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtn = document.getElementById('open-resume-btn');
    const closeResumeBtn = document.getElementById('resume-modal-close');

    const openResume = (e) => {
        if (e) e.preventDefault();
        if (!resumeModal) return;
        resumeModal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        if (closeResumeBtn) closeResumeBtn.focus();
    };

    const closeResume = () => {
        if (!resumeModal) return;
        resumeModal.setAttribute('hidden', '');
        document.body.style.overflow = '';
    };

    if (openResumeBtn) {
        openResumeBtn.addEventListener('click', openResume);
    }

    if (closeResumeBtn) {
        closeResumeBtn.addEventListener('click', closeResume);
    }

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeResume();
            }
        });
    }

    // Global ESC key listener for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (projectModal && !projectModal.hasAttribute('hidden')) {
                closeProjectModal();
            }
            if (resumeModal && !resumeModal.hasAttribute('hidden')) {
                closeResume();
            }
        }
    });

    // 7. Formspree Contact Form UX
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && submitBtn && formFeedback) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>`;
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = '';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formFeedback.className = 'form-feedback success';
                    formFeedback.textContent = "Thank you! Your message has been sent successfully. I will get back to you shortly.";
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data && data.errors) {
                        const errMsg = data.errors.map(err => err.message).join(', ');
                        formFeedback.className = 'form-feedback error';
                        formFeedback.textContent = `Error: ${errMsg}`;
                    } else {
                        throw new Error('Form submission failed');
                    }
                }
            } catch (err) {
                formFeedback.className = 'form-feedback error';
                formFeedback.textContent = "Unable to send message right now. Please email directly at nayakdibyaranjan2006@gmail.com";
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }
        });
    }
});
