/* =========================================================
   THE TORTURED DEVS DEPT.
   Shared JavaScript
   ========================================================= */


/* ---------------------------------------------------------
   CURRENT YEAR
   --------------------------------------------------------- */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* ---------------------------------------------------------
   MOBILE NAVIGATION
   --------------------------------------------------------- */

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", () => {

        siteNav.classList.toggle("open");

        const isOpen = siteNav.classList.contains("open");

        menuToggle.textContent = isOpen ? "×" : "☰";
    });


    document.querySelectorAll(".site-nav a").forEach(link => {

        link.addEventListener("click", () => {

            siteNav.classList.remove("open");

            menuToggle.textContent = "☰";
        });

    });
}


/* ---------------------------------------------------------
   CONTACT FORM
   --------------------------------------------------------- */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        formMessage.textContent =
            "Correspondence drafted. Transmission endpoint not yet established.";

        contactForm.reset();

    });

}


/* ---------------------------------------------------------
   REDACTED TEXT
   --------------------------------------------------------- */

document.querySelectorAll(".classified").forEach(item => {

    item.addEventListener("click", () => {

        item.classList.toggle("revealed");

    });

});


/* ---------------------------------------------------------
   RANDOM DEPARTMENT STATUS
   --------------------------------------------------------- */

const statuses = [
    "SYSTEM OPERATIONAL",
    "PROBABLY FUNCTIONAL",
    "UNDER INVESTIGATION",
    "IT WORKS LOCALLY",
    "BUGS PENDING",
    "DO NOT ASK"
];

const statusElement = document.querySelector("[data-status]");

if (statusElement) {

    const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

    statusElement.textContent = randomStatus;

}


/* ---------------------------------------------------------
   CONSOLE EASTER EGG
   --------------------------------------------------------- */

console.log(
`
╔══════════════════════════════════════╗
║  THE TORTURED DEVS DEPT.             ║
║                                      ║
║  You weren't supposed to find this.  ║
║                                      ║
║  CASE NO. 0001                       ║
║  STATUS: questionable                ║
╚══════════════════════════════════════╝
`
);