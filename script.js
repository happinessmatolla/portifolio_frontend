/**
 * Project: Aesthetic Data Science Portfolio
 * JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Preloader
    const preloader = document.querySelector('#preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // 2. Typing Animation
    const typingElement = document.querySelector('.typing-text');
    const texts = ["Data Scientist", "ML Engineer", "Data Analyst"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        typingElement.textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // Pause at end
        } else {
            setTimeout(type, 150);
        }
    }
    type();

    // 3. Sticky Navbar
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });

    // 4. Skill Bars Animation
    const skillSection = document.querySelector('#skills');
    const progressLines = document.querySelectorAll('.progress-line span');

    function showProgress() {
        progressLines.forEach(line => {
            const value = line.parentElement.getAttribute('data-percent');
            line.style.width = value;
        });
    }

    // Intersection Observer for Skills
    const observer = new IntersectionObserver((entries) => {
        if (entries[0] && entries[0].isIntersecting) {
            showProgress();
        }
    }, { threshold: 0.5 });

    if (skillSection) observer.observe(skillSection);

    // 5. Scroll to Top
    const scrollTopBtn = document.querySelector('#scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 6. Active Link on Scroll
    const sections = document.querySelectorAll('section, header');
    const navLi = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // =========================================
    // 7. CONTACT FORM SUBMISSION (BACKEND LINK)
    // =========================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Get the button and status
            const submitBtn = contactForm.querySelector('button');
            const originalBtnText = submitBtn.innerText;
            
            // 2. Collect Data from Form
            const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
            const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
            const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
            const message = contactForm.querySelector('textarea').value;

            const formData = { name, email, subject, message };

            // 3. UI Feedback (Sending state)
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            try {
                /** 
                 * IMPORTANT: 
                 * While testing locally, use: 'http://localhost:5000/api/contact'
                 * Once you deploy to Render, change this to your Render URL:
                 * Example: 'https://portfolio-backend-xyz.onrender.com/api/contact'
                 */
               const response = await fetch('https://portfolio-backend-gmtq.onrender.com/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    alert("✨ Thank you! Your message has been sent successfully.");
                    contactForm.reset();
                } else {
                    alert("Oops! Something went wrong. Please try again.");
                }

            } catch (error) {
                console.error("Error:", error);
                alert("Connection error! Make sure your backend server is running.");
            } finally {
                // 4. Restore Button state
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});