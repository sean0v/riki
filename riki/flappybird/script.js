const bird = document.getElementById('bird');
const gameContainer = document.getElementById('game-container');

let birdY = gameContainer.clientHeight / 2 - 20; // Noteikta putna sākuma pozīcija vidū 
let birdVelocity = 0; // Putna paātrinājums
let gravity = 0.1; // Gravitācija
let isJumping = false; // Vai putns pašlaik lido
let isGameOver = true; // Vai spēle ir beigusies

function jump() {
    if (isGameOver) {
        return;
    }

    if (!isJumping) {
        birdVelocity = -4; // Samazināts lidojuma spēks
    }
}

function startGame() {
    if (isGameOver) {
        isGameOver = false;
        birdY = gameContainer.clientHeight / 2 - 20; // Atiestata putnu uz vidu
        birdVelocity = 0;
        isJumping = false;
    }
}

// sāk spēli uz jebkura taustiņa nospiešanas
window.addEventListener('keydown', startGame);

window.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'Spacebar') {
        jump();
    }
});

let pipeX = gameContainer.clientWidth; // Pielāgo caurules sākuma pozīciju
let pipeSpacing = 200; // Pielāgo caurules attālumu

function createPipe() {
    if (isGameOver) {
        return;
    }

    // Izveido augšējās caurules
    const topPipe = document.createElement('div');
    topPipe.className = 'pipe';
    const topPipeHeight = Math.random() * 200 + 100; // Nosaka augšējās caurules augstumu
    topPipe.style.height = topPipeHeight + 'px';
    topPipe.style.left = pipeX + 'px'; 
    gameContainer.appendChild(topPipe);

    // Izveido apakšējās caurules
    const bottomPipe = document.createElement('div');
    bottomPipe.className = 'pipe';
    const bottomPipeHeight = gameContainer.clientHeight - topPipeHeight - pipeSpacing; 
    bottomPipe.style.height = bottomPipeHeight + 'px';
    bottomPipe.style.left = pipeX + 'px';
    bottomPipe.style.top = topPipeHeight + pipeSpacing + 'px';
    gameContainer.appendChild(bottomPipe);

    const pipeMoveInterval = setInterval(() => {
        if (birdY + 40 < 0 || birdY > gameContainer.clientHeight) {
        }

        const pipeX = topPipe.getBoundingClientRect().left;
        if (pipeX < -80) {
            gameContainer.removeChild(topPipe);
            gameContainer.removeChild(bottomPipe);
        }

        // sadursmes noteikšana ar caurulēm
        const birdRect = bird.getBoundingClientRect();
        const topPipeRect = topPipe.getBoundingClientRect();
        const bottomPipeRect = bottomPipe.getBoundingClientRect();
        if (
            birdRect.right > topPipeRect.left &&
            birdRect.left < topPipeRect.right &&
            ((birdRect.top < topPipeRect.bottom && birdRect.bottom > topPipeRect.top) ||
            (birdRect.top < bottomPipeRect.bottom && birdRect.bottom > bottomPipeRect.top))
        ) {
            gameover();
            clearInterval(pipeMoveInterval);
        }

        topPipe.style.left = pipeX - 4 + 'px';
        bottomPipe.style.left = pipeX - 4 + 'px';
    }, 1);

    pipeX += pipeSpacing;
}

function gameover() {
    isGameOver = true;
    // alert('Spēle beigusies!');
    window.location.reload();
}

// Palielina intervālu, lai caurules parādītos tuvāk sākumam
setInterval(createPipe, 1000);

function gameLoop() {
    if (!isGameOver) {
        birdVelocity += gravity;
        birdY += birdVelocity;

        if (birdY < 0) {
            birdY = 0;
            birdVelocity = 0;
        }

        if (birdY + 40 > gameContainer.clientHeight) {
            gameover();
        }

        bird.style.top = birdY + 'px';
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
