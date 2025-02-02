document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const menuButton = document.getElementById("menuButton");
  
    menuButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevents the click from closing immediately
      menu.classList.toggle("active");
    });
  
    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && event.target !== menuButton) {
        menu.classList.remove("active");
      }
    });
  });
  