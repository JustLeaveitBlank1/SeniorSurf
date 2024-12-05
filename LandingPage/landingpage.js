// Responsive Navbar Toggle
document.querySelector(".menu-toggle").addEventListener("click", () => {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({
            behavior: "smooth",
        });
    });
});

// Lazy Loading Images
document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll("img");
    lazyImages.forEach(img => {
        img.loading = "lazy";
    });
});
