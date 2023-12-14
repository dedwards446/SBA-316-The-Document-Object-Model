document.addEventListener('DOMContentLoaded', function () {
    // Cache elements
    const gameContainer = document.getElementById('game-container');
    const zodiacForm = document.getElementById('zodiac-form');
    const userZodiacInput = document.getElementById('user-zodiac');
    const errorMessage = document.getElementById('error-message');
    const congratulationsMessage = document.getElementById('congratulations');
    const scoreElement = document.getElementById('score');
    const resetButton = document.getElementById('reset-button');

    // Sample zodiac signs
    const zodiacSigns = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];

    // Shuffle the zodiac signs
    const shuffledZodiacSigns = shuffleArray([...zodiacSigns, ...zodiacSigns]);

    // Create elements using DocumentFragment
    const fragment = document.createDocumentFragment();
    shuffledZodiacSigns.forEach(sign => {
        const zodiacElement = document.createElement('div');
        zodiacElement.className = 'card';
        zodiacElement.textContent = '?';
        zodiacElement.setAttribute('data-sign', sign);
        zodiacElement.addEventListener('click', handleCardClick);
        fragment.appendChild(zodiacElement);
    });
    gameContainer.appendChild(fragment);

    let selectedCards = [];
    let score = 0;

    // Event handler for card click
    function handleCardClick(event) {
        const clickedCard = event.target;
        
        // Check if the card is already matched or selected
        if (!clickedCard.classList.contains('matched') && selectedCards.length < 2) {
            // Modify content and style
            clickedCard.textContent = clickedCard.getAttribute('data-sign');
            selectedCards.push(clickedCard);

            // Check for a match after two cards are selected
            if (selectedCards.length === 2) {
                if (selectedCards[0].textContent === selectedCards[1].textContent) {
                    // Match found, show congratulations message, disable further clicks, and update score
                    congratulationsMessage.style.display = 'block';
                    selectedCards.forEach(card => {
                        card.classList.add('matched');
                    });
                    score += 1;
                    scoreElement.textContent = `Score: ${score}`;
                    setTimeout(() => {
                        congratulationsMessage.style.display = 'none';
                        checkGameCompletion();
                    }, 1500);
                } else {
                    // No match, flip the cards back after a short delay
                    setTimeout(() => {
                        selectedCards.forEach(card => {
                            card.textContent = '?';
                        });
                    }, 1000);
                }
                selectedCards = [];
            }
        }
    }

    // Event handler for form submission
    zodiacForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const userZodiac = userZodiacInput.value.trim().toLowerCase();
        const isValidZodiac = zodiacSigns.includes(userZodiac.charAt(0).toUpperCase() + userZodiac.slice(1));

        if (isValidZodiac) {
            errorMessage.style.display = 'none';
        } else {
            errorMessage.style.display = 'block';
        }
    });

    // Event handler for reset button
    resetButton.addEventListener('click', function () {
        resetGame();
    });

    // Check if all cards are matched to complete the game
    function checkGameCompletion() {
        const allCards = document.querySelectorAll('.card');
        const matchedCards = document.querySelectorAll('.matched');
        
        if (allCards.length === matchedCards.length) {
            alert('Congratulations! You completed the game!');
            resetGame();
        }
    }

    // Reset the game
    function resetGame() {
        // Remove all cards from the game container
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
        }

        // Shuffle the zodiac signs
        const shuffledZodiacSigns = shuffleArray([...zodiacSigns, ...zodiacSigns]);

        // Create elements using DocumentFragment
        const fragment = document.createDocumentFragment();
        shuffledZodiacSigns.forEach(sign => {
            const zodiacElement = document.createElement('div');
            zodiacElement.className = 'card';
            zodiacElement.textContent = '?';
            zodiacElement.setAttribute('data-sign', sign);
            zodiacElement.addEventListener('click', handleCardClick);
            fragment.appendChild(zodiacElement);
        });
        gameContainer.appendChild(fragment);

        // Reset other game variables
        selectedCards = [];
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        congratulationsMessage.style.display = 'none';
    }

    // Shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});