let enlargedCard = null;

document.querySelectorAll('.card-container').forEach(cardContainer => {
  cardContainer.addEventListener('click', function (event) {
    const card = this.querySelector('.card-inner');

    // Prevent closing if clicking inside the enlarged card
    event.stopPropagation();

    // If already enlarged, flip it
    if (this.classList.contains('enlarged')) {
      card.classList.toggle('flipped');
    } else {
      // Close any other enlarged card
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

function closeCard() {
  if (enlargedCard) {
    enlargedCard.classList.remove('enlarged');
    enlargedCard.querySelector('.card-inner').classList.remove('flipped');
    document.getElementById("overlay").style.display = "none";
    enlargedCard = null;
  }
}

document.getElementById("overlay").addEventListener("click", closeCard);
