let enlargedCard = null;

document.addEventListener("click", function (event) {
  const clickedCard = event.target.closest(".card-container");
  
  if (clickedCard) {
    const cardInner = clickedCard.querySelector('.card-inner');

    if (clickedCard.classList.contains("enlarged")) {
      cardInner.classList.toggle("flipped"); // Flip when clicking an enlarged card
    } else {
      if (enlargedCard) closeCard();

      clickedCard.classList.add("enlarged");
      document.getElementById("overlay").style.display = "block";
      enlargedCard = clickedCard;
    }
  }
});

function closeCard() {
  if (enlargedCard) {
    enlargedCard.classList.remove("enlarged");
    enlargedCard.querySelector('.card-inner').classList.remove("flipped"); // Reset flip when closing
    document.getElementById("overlay").style.display = "none";
    enlargedCard = null;
  }
}

document.getElementById("overlay").addEventListener("click", closeCard);
