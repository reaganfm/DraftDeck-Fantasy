document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const menu = document.getElementById("menu");

    if (!menuIcon || !menu) return; // Prevents errors if elements are missing

    menuIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && event.target !== menuIcon) {
            menu.style.display = "none";
        }
    });

    // Close menu when clicking a menu link
    document.querySelectorAll("#menu a").forEach(link => {
        link.addEventListener("click", function () {
            menu.style.display = "none";
        });
    });
});
