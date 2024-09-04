const cardsArray = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
];

let firstCard = null;
let secondCard = null;
let isFlipping = false;
let matchedPairs = 0;

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restart');

    /**
     * Shuffles the cards array in place.
     */
    function shuffleCards() {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }
    }

    /**
     * Creates the game board by generating card elements.
     */
    function createBoard() {
        shuffleCards();
        gameBoard.innerHTML = ''; // Clear the game board

        cardsArray.forEach((cardName) => {
            const cardElement = createCardElement(cardName);
            gameBoard.appendChild(cardElement);
        });

        addCardClickHandlers();
    }

    /**
     * Creates a single card element.
     * @param {string} cardName - The name of the card to display on the front face.
     * @returns {HTMLElement} - The DOM element representing the card.
     */
    function createCardElement(cardName) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = cardName;

        const frontFace = document.createElement('div');
        frontFace.classList.add('front');
        frontFace.textContent = cardName;

        const backFace = document.createElement('div');
        backFace.classList.add('back');
        backFace.textContent = '?';

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);

        return cardElement;
    }

    /**
     * Adds click event listeners to all cards.
     */
    function addCardClickHandlers() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', handleCardClick);
        });
    }

    /**
     * Handles the click event on a card.
     * @param {Event} e - The click event.
     */
    function handleCardClick(e) {
        const card = e.currentTarget;

        if (isFlipping || card.classList.contains('flipped') || card === firstCard) {
            return;
        }

        flipCard(card);

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            checkForMatch();
        }
    }

    /**
     * Flips a card to reveal its front face.
     * @param {HTMLElement} card - The card element to flip.
     */
    function flipCard(card) {
        card.classList.add('flipped');
    }

    /**
     * Checks if the two flipped cards match.
     */
    function checkForMatch() {
        isFlipping = true;

        const match = firstCard.dataset.name === secondCard.dataset.name;

        match ? disableCards() : unflipCards();
    }

    /**
     * Disables the matched cards so they can't be flipped again.
     */
    function disableCards() {
        firstCard.removeEventListener('click', handleCardClick);
        secondCard.removeEventListener('click', handleCardClick);

        resetSelection();
        matchedPairs++;

        if (matchedPairs === cardsArray.length / 2) {
            setTimeout(() => alert('You won!'), 500);
        }
    }

    /**
     * Unflips the two non-matching cards after a short delay.
     */
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetSelection();
        }, 1000);
    }

    /**
     * Resets the selection and flipping state.
     */
    function resetSelection() {
        [firstCard, secondCard] = [null, null];
        isFlipping = false;
    }

    /**
     * Restarts the game by resetting variables and creating a new board.
     */
    function restartGame() {
        matchedPairs = 0;
        resetSelection();
        createBoard();
    }

    restartButton.addEventListener('click', restartGame);
    restartGame(); // Start the game initially
});
