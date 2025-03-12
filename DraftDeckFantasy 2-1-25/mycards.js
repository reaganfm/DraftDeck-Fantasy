let enlargedCard = null;

// Add event listeners to all card containers
document.querySelectorAll('.card-container').forEach(cardContainer => {
  const cardInner = cardContainer.querySelector('.card-inner');

  // Click event to enlarge card
  cardContainer.addEventListener('click', function (event) {
    event.stopPropagation();

    // If this card is already enlarged, do nothing here (flip happens separately)
    if (!this.classList.contains('enlarged')) {
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

  // Click event to flip the card (trigger only when enlarged)
  cardInner.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent closing when clicking inside
    if (cardContainer.classList.contains('enlarged')) {
      this.classList.toggle('flipped'); // Flip the card
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
