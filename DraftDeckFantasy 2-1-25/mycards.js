let enlargedCard = null;

document.querySelectorAll('.card-container').forEach(cardContainer => {
  cardContainer.addEventListener('click', function (event) {
    const cardInner = this.querySelector('.card-inner');

    // Prevent closing if clicking inside the enlarged card
    event.stopPropagation();

    // If the card is already enlarged, flip it
    if (this.classList.contains('enlarged')) {
      cardInner.classList.toggle('flipped');
    } else {
      // Close any previously enlarged card
      if (enlargedCard) {
        closeCard();
      }

      // Enlarge the clicked card
      this.classList.add('enlarged');
      document.getElementById("overlay").style.display = "block";
      enlargedCard = this;
    }
  });
});

// Close enlarged card when clicking outside
function closeCard() {
  if (enlargedCard) {
    enlargedCard.classList.remove('enlarged');
    enlargedCard.querySelector('.card-inner').classList.remove('flipped'); // Reset flip when closing
    document.getElementById("overlay").style.display = "none";
    enlargedCard = null;
  }
}

document.getElementById("overlay").addEventListener("click", closeCard);
