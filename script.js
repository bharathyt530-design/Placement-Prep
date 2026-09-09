/* =========================================================
   PLACEMENT PREP - SCRIPT.JS
   ========================================================= */


/* ================= PAGE LOADED ================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();
    initializeButtons();
    initializeFeatureLinks();
    initializeProgressAnimation();
    initializeScrollAnimation();
    initializeUserStorage();

});


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {

                const target = document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });

}


/* =========================================================
   BUTTONS
   ========================================================= */

function initializeButtons() {

    const loginButton = document.querySelector(".login-btn");
    const signupButton = document.querySelector(".signup-btn");

    const primaryButtons = document.querySelectorAll(".primary-btn");
    const secondaryButtons = document.querySelectorAll(".secondary-btn");


    /* ---------- LOGIN ---------- */

    if (loginButton) {

        loginButton.addEventListener("click", () => {

            const userName = prompt(
                "Enter your name to continue:"
            );

            if (userName && userName.trim() !== "") {

                const name = userName.trim();

                localStorage.setItem(
                    "placementPrepUser",
                    name
                );

                showNotification(
                    `Welcome back, ${name}! 👋`
                );

                updateUserDisplay();

            }

        });

    }


    /* ---------- SIGN UP ---------- */

    if (signupButton) {

        signupButton.addEventListener("click", () => {

            const userName = prompt(
                "Create your account - Enter your name:"
            );

            if (userName && userName.trim() !== "") {

                const name = userName.trim();

                localStorage.setItem(
                    "placementPrepUser",
                    name
                );

                showNotification(
                    `Account created successfully, ${name}! 🎉`
                );

                updateUserDisplay();

            }

        });

    }


    /* ---------- START PREPARING ---------- */

    primaryButtons.forEach(button => {

        button.addEventListener("click", () => {

            const featuresSection =
                document.querySelector("#features");

            if (featuresSection) {

                featuresSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    /* ---------- EXPLORE COURSES ---------- */

    secondaryButtons.forEach(button => {

        button.addEventListener("click", () => {

            const featuresSection =
                document.querySelector("#features");

            if (featuresSection) {

                featuresSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

            showNotification(
                "Explore our placement preparation modules 📚"
            );

        });

    });

}


/* =========================================================
   FEATURE LINKS
   ========================================================= */

function initializeFeatureLinks() {

    const featureLinks =
        document.querySelectorAll(".feature-card a");

    featureLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (href && href !== "#") {
                return;
            }

            event.preventDefault();

            showNotification("Module coming soon 🚀");
        });

    });
}


/* =========================================================
   PROGRESS BAR ANIMATION
   ========================================================= */

function initializeProgressAnimation() {

    const progressBars =
        document.querySelectorAll(".progress");

    progressBars.forEach(bar => {

        const originalWidth =
            window.getComputedStyle(bar).width;

        bar.style.width = "0";

        setTimeout(() => {

            bar.style.transition =
                "width 1.2s ease";

            bar.style.width =
                originalWidth;

        }, 300);

    });

}


/* =========================================================
   SCROLL ANIMATION
   ========================================================= */

function initializeScrollAnimation() {

    const cards =
        document.querySelectorAll(
            ".feature-card, .stat, .about-card"
        );

    if (!("IntersectionObserver" in window)) {

        cards.forEach(card => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        });

        return;

    }


    cards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(25px)";
        card.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    cards.forEach(card => {
        observer.observe(card);
    });

}


/* =========================================================
   NOTIFICATION
   ========================================================= */

function showNotification(message) {

    const oldNotification =
        document.querySelector(".custom-notification");

    if (oldNotification) {
        oldNotification.remove();
    }


    const notification =
        document.createElement("div");

    notification.className =
        "custom-notification";

    notification.textContent =
        message;


    notification.style.position = "fixed";
    notification.style.top = "90px";
    notification.style.right = "25px";
    notification.style.zIndex = "9999";

    notification.style.padding =
        "14px 20px";

    notification.style.background =
        "#0f172a";

    notification.style.color =
        "#ffffff";

    notification.style.borderRadius =
        "10px";

    notification.style.fontSize =
        "14px";

    notification.style.fontWeight =
        "600";

    notification.style.boxShadow =
        "0 10px 30px rgba(15, 23, 42, 0.2)";

    notification.style.opacity = "0";

    notification.style.transform =
        "translateY(-10px)";

    notification.style.transition =
        "all 0.3s ease";


    document.body.appendChild(
        notification
    );


    requestAnimationFrame(() => {

        notification.style.opacity = "1";

        notification.style.transform =
            "translateY(0)";

    });


    setTimeout(() => {

        notification.style.opacity = "0";

        notification.style.transform =
            "translateY(-10px)";

        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2500);

}


/* =========================================================
   USER STORAGE
   ========================================================= */

function initializeUserStorage() {

    const savedUser =
        localStorage.getItem(
            "placementPrepUser"
        );

    if (savedUser) {

        updateUserDisplay();

    }

}


/* =========================================================
   UPDATE USER DISPLAY
   ========================================================= */

function updateUserDisplay() {

    const savedUser =
        localStorage.getItem(
            "placementPrepUser"
        );

    if (!savedUser) return;


    const loginButton =
        document.querySelector(".login-btn");

    const signupButton =
        document.querySelector(".signup-btn");


    if (loginButton) {

        loginButton.textContent =
            `Hi, ${savedUser}`;

    }


    if (signupButton) {

        signupButton.textContent =
            "Logout";

        signupButton.onclick = () => {

            const confirmLogout =
                confirm(
                    "Do you want to logout?"
                );

            if (confirmLogout) {

                localStorage.removeItem(
                    "placementPrepUser"
                );

                loginButton.textContent =
                    "Login";

                signupButton.textContent =
                    "Sign Up";

                showNotification(
                    "You have been logged out 👋"
                );

            }

        };

    }

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

window.addEventListener("scroll", () => {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.style.color = "";

        const href =
            link.getAttribute("href");

        if (
            href === `#${currentSection}`
        ) {

            link.style.color =
                "#2563eb";

        }

    });

});


/* =========================================================
   PREVENT EMPTY LINKS
   ========================================================= */

document.addEventListener("click", event => {

    const link =
        event.target.closest("a");

    if (!link) return;

    const href =
        link.getAttribute("href");

    if (href === "#") {


    }

});


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "🎓 Placement Prep loaded successfully!"
);

console.log(
    "🚀 Frontend version is ready."
);

console.log(
    "💡 Backend integration can be added later."
);