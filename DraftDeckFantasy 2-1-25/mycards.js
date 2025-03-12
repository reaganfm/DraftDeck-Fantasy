let enlargedCard = null;

// Add event listeners to all card containers
document.querySelectorAll('.card-container').forEach(cardContainer => {
  const cardInner = cardContainer.querySelector('.card-inner');

  // Click event to enlarge card
  cardContainer.addEventListener('click', function (event) {
    event.stopPropagation();

    // If already enlarged, flip the card instead
    if (this === enlargedCard) {
      cardInner.classList.toggle('flipped');
    } else {
      // Close any previously enlarged card
      if (enlargedCard) {
        closeCard();
      }

      // Enlarge this card
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

// Event to close enlarged card when clicking on the overlay
document.getElementById("overlay").addEventListener("click", closeCard);
