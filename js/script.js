/**
 * Dibyaranjan Nayak — Portfolio 2026 Interactive Architecture
 * High-performance, accessible vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Drawer
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

        // Close when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (primaryNav.classList.contains('open')) {
                    toggleMenu(false);
                }
            });
        });

        // Close on clicking outside nav
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

    // 2. Header Scrolled State (Subtle border enhancement)
    const handleScroll = () => {
        if (window.scrollY > 15) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 3. ScrollSpy: Highlight Active Nav Link
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
    };

    const scrollObserver = new IntersectionObserver((entries) => {
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

    sections.forEach(sec => scrollObserver.observe(sec));

    // 4. Project Technical Architecture Database
    const projectSpecs = {
        examguard: {
            title: "ExamGuard AI",
            category: "Multimodal AI &middot; Computer Vision",
            body: `
                <div class="modal-section">
                    <h5 class="modal-section-title">THE PROBLEM</h5>
                    <p>High-stakes online assessments face integrity vulnerabilities, yet blunt automated systems issue blanket disqualifications that create false positives, panic, and zero explainability.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">SYSTEM PHILOSOPHY</h5>
                    <p>AI should be an evidence aggregator, not a judge. The system captures timestamped multimodal signals (head orientation, gaze deflection, person count) and bundles them into an auditable review queue for human proctors.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">TECHNICAL PIPELINE</h5>
                    <p><strong>1. Edge Ingestion:</strong> Evaluates webcam video frames at 30 FPS using lightweight OpenCV heuristics.<br>
                    <strong>2. Signal Extraction:</strong> Flags persistent gaze deviation, absent test-taker, and multi-face anomalies.<br>
                    <strong>3. Evidence Packaging:</strong> Saves timestamped frame snapshots with contextual metadata into an incident review queue.<br>
                    <strong>4. Human Dashboard:</strong> Provides proctors with side-by-side video evidence and signal confidence scores.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">TECH STACK</h5>
                    <p>Python, OpenCV, Computer Vision, Edge Telemetry, REST APIs, Streamlit / Web Interface.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">CURRENT STATUS</h5>
                    <p>Core vision pipelines prototyped; actively benchmarking detector confidence and false-alarm mitigation across heterogeneous lighting conditions.</p>
                </div>
            `
        },
        saern: {
            title: "SAERN — Swarm AI Emergency Response Network",
            category: "Swarm AI &middot; Emergency Response",
            body: `
                <div class="modal-section">
                    <h5 class="modal-section-title">THE PROBLEM</h5>
                    <p>Centralized dispatch mechanisms experience severe communication delays and resource allocation bottlenecks when managing rapidly evolving crisis scenarios across distributed regions.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">SWARM ARCHITECTURE</h5>
                    <p>SAERN models autonomous swarm agents that dynamically coordinate and prioritize distress feeds. Individual agents analyze local incident telemetry and collaborate to optimize simulated vehicle and medic distribution without a single point of failure.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">TECH STACK & DEPLOYMENT</h5>
                    <p>Python, Multi-Agent Swarm Protocols, Docker Containerization, Hugging Face Spaces runtime.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">REPOSITORY</h5>
                    <p>Public code is available for inspection at <a href="https://github.com/dibyax21/SAERN" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: underline;">github.com/dibyax21/SAERN</a>.</p>
                </div>
            `
        },
        devassistant: {
            title: "Multi-Agent Developer Assistant (NexusAI)",
            category: "Agentic AI &middot; Developer Tools",
            body: `
                <div class="modal-section">
                    <h5 class="modal-section-title">THE PROBLEM</h5>
                    <p>Single-turn code prompts frequently result in syntactic bugs, architectural gaps, and overlooked edge cases because code is generated without structured review.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">COLLABORATIVE AGENT PIPELINE</h5>
                    <p>Implements a 3-agent orchestration pattern:
                    <br>&bull; <strong>Planner Agent:</strong> Deconstructs natural language prompts into architectural specifications.
                    <br>&bull; <strong>Coder Agent:</strong> Writes modular code strictly matching the blueprint.
                    <br>&bull; <strong>Debugger Agent:</strong> Analyzes generated code for syntax, optimization, and edge cases.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">TECH STACK</h5>
                    <p>Python 3.10+, FastAPI, Uvicorn, OpenAI SDK / Intelligent Fallback Simulator, Tailwind CSS, Vanilla JS, Highlight.js.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">REPOSITORY</h5>
                    <p>Public code is available at <a href="https://github.com/dibyax21/multi-agent-dev-assistant-web" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: underline;">github.com/dibyax21/multi-agent-dev-assistant-web</a>.</p>
                </div>
            `
        },
        assistant: {
            title: "Personal AI Assistant",
            category: "AI Assistant &middot; Automation",
            body: `
                <div class="modal-section">
                    <h5 class="modal-section-title">THE PROBLEM</h5>
                    <p>Developers lose flow context switching between terminals, search engines, and manual operating system controls for routine workflows.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">SYSTEM IMPLEMENTATION</h5>
                    <p>Built a modular Python desktop assistant combining live speech recognition, natural language query handling via AI APIs, and local OS scripting to automate desktop search, application launches, and system queries.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">TECH STACK</h5>
                    <p>Python, SpeechRecognition, Pyttsx3 / Text-to-Speech, OS Subprocess scripting, AI APIs.</p>
                </div>
            `
        },
        attendance: {
            title: "Computer Vision Attendance System",
            category: "Computer Vision &middot; Biometrics",
            body: `
                <div class="modal-section">
                    <h5 class="modal-section-title">THE PROBLEM</h5>
                    <p>Traditional attendance tracking is slow and prone to proxy errors, while basic facial recognition systems can easily be tricked by static photos on smartphone screens.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">SYSTEM IMPLEMENTATION</h5>
                    <p>Engineered a real-time face verification pipeline that computes face embeddings and applies anti-spoofing heuristics (eye-blink frequency and facial texture analysis) to verify physical liveness before recording attendance into an administrative log.</p>
                </div>
                <div class="modal-section">
                    <h5 class="modal-section-title">TECH STACK</h5>
                    <p>Python, OpenCV, Face Recognition libraries, Real-time video processing, Structured Data Logging.</p>
                </div>
            `
        }
    };

    // 5. Modal Controller
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-proj-title');
    const modalBody = document.getElementById('modal-body');

    let lastFocusedElement = null;

    const openModal = (id) => {
        const spec = projectSpecs[id];
        if (!spec || !modal) return;

        lastFocusedElement = document.activeElement;

        modalCategory.innerHTML = spec.category;
        modalTitle.textContent = spec.title;
        modalBody.innerHTML = spec.body;

        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        if (modalClose) modalClose.focus();
    };

    const closeModal = () => {
        if (!modal) return;
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    document.querySelectorAll('.open-project-modal, .card-detail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-project');
            openModal(id);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ESC key listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) {
            closeModal();
        }
    });

    // 6. Formspree Contact Form Submission (Asynchronous UX)
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && submitBtn && formFeedback) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const originalContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>`;
            formFeedback.className = 'form-feedback-alert';
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
                    formFeedback.className = 'form-feedback-alert success';
                    formFeedback.textContent = "Thank you! Your note has been received. I'll get back to you shortly.";
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data && data.errors) {
                        const errMsg = data.errors.map(err => err.message).join(', ');
                        formFeedback.className = 'form-feedback-alert error';
                        formFeedback.textContent = `Error: ${errMsg}`;
                    } else {
                        throw new Error('Form submission failed');
                    }
                }
            } catch (err) {
                formFeedback.className = 'form-feedback-alert error';
                formFeedback.textContent = "Could not send message right now. Feel free to email directly at nayakdibyaranjan2006@gmail.com";
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
            }
        });
    }
});
