// Premium Architecture Portfolio Scripting

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Custom Cursor Logic
    const cursor = document.getElementById('custom-cursor');
    const cursorGlow = document.getElementById('cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(cursorGlow, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });

    document.querySelectorAll('a, button, .project-card').forEach(link => {
        link.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        link.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // 3. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Preloader Animation
    const preloaderTl = gsap.timeline();
    preloaderTl.to(".loader-progress", {
        x: "0%",
        duration: 1.5,
        ease: "power2.inOut"
    })
    .to("#preloader", {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut"
    })
    .from(".hero-left .reveal-text span", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
    }, "-=0.5")
    .from(".video-container", {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        ease: "power3.out"
    }, "-=1.5");

    // Scroll Progress Line
    gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3
        }
    });

    // Magnetic Buttons (for the Play Button)
    const magneticBtns = document.querySelectorAll('.magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

});
