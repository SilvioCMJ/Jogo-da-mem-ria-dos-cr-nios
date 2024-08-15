const cards = [];
const pairs = 15;
let flippedCards = [];
let matchedCards = [];
let currentPlayer = 1;
let score1 = 0;
let score2 = 0;

function initializeGame() {
    for (let i = 1; i <= pairs * 2; i += 2) {
        cards.push({ id: i, pairId: i + 1, img: `cards_img/${i}.jpg` });
        cards.push({ id: i + 1, pairId: i, img: `cards_img/${i + 1}.jpg` });
    }
    cards.sort(() => 0.5 - Math.random());
    createBoard();
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.style.backgroundImage = `url('cards_img/back.jpg')`;
        cardElement.style.backgroundSize = 'cover';
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    const cardIndex = this.dataset.index;
    if (flippedCards.length < 2 && !matchedCards.includes(cardIndex) && !flippedCards.includes(cardIndex)) {
        this.innerHTML = `<img src="${cards[cardIndex].img}" alt="Card" style="width: 100%; height: 100%; object-fit: cover;">`;
        flippedCards.push(cardIndex);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCardIndex, secondCardIndex] = flippedCards;
    const firstCard = cards[firstCardIndex];
    const secondCard = cards[secondCardIndex];

    if (firstCard.pairId === secondCard.id) {
        matchedCards.push(firstCardIndex, secondCardIndex);
        updateScore();
    } else {
        const firstCardElement = document.querySelector(`[data-index='${firstCardIndex}']`);
        const secondCardElement = document.querySelector(`[data-index='${secondCardIndex}']`);
        setTimeout(() => {
            firstCardElement.innerHTML = '';
            secondCardElement.innerHTML = '';
            firstCardElement.style.backgroundImage = `url('cards_img/back.jpg')`;
            secondCardElement.style.backgroundImage = `url('cards_img/back.jpg')`;
            switchPlayer(); // Alterna para o próximo jogador apenas se errar
        }, 500);
    }
    flippedCards = [];
    checkGameEnd();
}

function updateScore() {
    if (currentPlayer === 1) {
        score1++;
        document.getElementById('score1').textContent = score1;
    } else {
        score2++;
        document.getElementById('score2').textContent = score2;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('current-player').textContent = `Jogador Atual: ${currentPlayer}`;
}

function checkGameEnd() {
    if (matchedCards.length === cards.length) {
        let message = 'Empate!';
        if (score1 > score2) {
            message = 'Jogador 1 Ganhou!';
        } else if (score2 > score1) {
            message = 'Jogador 2 Ganhou!';
        }
        document.getElementById('message').textContent = message;
    }
}

document.getElementById('restart').addEventListener('click', () => {
    flippedCards = [];
    matchedCards = [];
    currentPlayer = 1;
    score1 = 0;
    score2 = 0;
    document.getElementById('score1').textContent = 0;
    document.getElementById('score2').textContent = 0;
    document.getElementById('message').textContent = '';
    document.getElementById('current-player').textContent = 'Jogador Atual: 1';
    initializeGame();
});

initializeGame();
