let MyCanvas = document.getElementById("myCanvas");
let CurrentScore = document.getElementById("PlayerScore");
let myAudio = document.getElementById("audio_control");
let retryButtonContainer = document.getElementById("retryButtonContainer");
let retryButton = document.createElement("button");
retryButton.id = "retryButton";
retryButton.style.display = "none"; // Hide the retry button initially
retryButtonContainer.appendChild(retryButton);
retryButton.addEventListener("click", function () {
    location.reload();
});
retryButton.style.backgroundImage = "url('/Assets/RetryBtn.png')";
retryButton.style.backgroundSize = "contain";
retryButton.style.backgroundRepeat = "no-repeat";
retryButton.style.height = "25px";
retryButton.style.width = "50px";
MyCanvas.height = 600;
MyCanvas.width = 600;
let Myshapes = MyCanvas.getContext("2d");
let height = MyCanvas.height;
let width = MyCanvas.width;
let centerX = width / 2;
let centerY = height / 2;
let sunWidth = centerX + 200;
let sunHeight = 100;
let groundX = 0;
let groundY = height - 50;
let groundWidth = width;
let groundHeight = 50;
let x1 = centerX / 2;
let y1 = centerY;
let yi = centerY;
let gravity = 0.5;
let friction = 0.05;
let airResistance = 0.01;
let Vy1 = 10;
let ballRadius = 20;
let min1 = width;
let max1 = width + 300;
let minWidth1 = 10;
let maxWidth1 = 40;
let obstacleX1 = randomNumber(min1, max1);
let obstacleY1 = height - 100;
let obstacleWidth1 = randomNumber(minWidth1, maxWidth1);
let obstacleHeight1 = 100;
let obstacleVelocity1 = 2;
let obstacleX2 = randomNumber(min1, max1);
let obstacleWidth2 = randomNumber(minWidth1, maxWidth1);
let obstaclecounter1 = 0;
let gameend = false;
let scoreCounter = 0;
let jumps = 0; // Variable to track number of jumps
let gameOverSoundPlayed = false; // Flag to check if game over sound has been played
myAudio.currentTime = 0;
myAudio.play();
document.addEventListener("keydown", function (event) {
    if (event.key === " " && jumps < 2) { // Allow jumping only if jumps < 2
        event.preventDefault(); // Prevent default action of scrolling
        if (gameend == false) {
            Vy1 = -10;
            jumps++; // Increment jumps
        }
    }
});
gameAnimation();

function gameAnimation() {
    requestAnimationFrame(gameAnimation);
    myAudio.play();
    Myshapes.clearRect(0, 0, width, height);
    Vy1 += gravity;
    Vy1 *= (1 - airResistance);
    Vy1 *= (1 - friction);
    y1 += Vy1;
    sunCreate();
    groundCreate();
    gameDifficulty();
    obstacleCreate1();
    obstacleCreate2();
    ballCreate(x1, y1);
    collisionGround();
    collideObstacle();
    y1 += Vy1;
    obstacleX1 -= obstacleVelocity1;
    obstacleX2 -= obstacleVelocity1;
    CurrentScore.innerHTML = scoreCounter;
    if (gameend) { // Check if the game is over
        retryButton.style.display = "block"; // Show the retry button
    }
}

function groundCreate() {
    Myshapes.fillStyle = "green";
    Myshapes.fillRect(groundX, groundY, groundWidth, groundHeight);
}

function ballCreate(x, y) {
    Myshapes.beginPath();
    Myshapes.arc(x, y, ballRadius, 0, 2 * Math.PI);
    Myshapes.fillStyle = "Red";
    Myshapes.fill();
    Myshapes.stroke();
}

function sunCreate() {
    Myshapes.beginPath();
    Myshapes.arc(sunWidth, sunHeight, 50, 0, 2 * Math.PI);
    Myshapes.fillStyle = "yellow";
    Myshapes.fill();
    Myshapes.stroke();
}

function collisionGround() {
    if (y1 + ballRadius > height - 51) {
        Vy1 = -Vy1;
        y1 = height - 50 - ballRadius;
        jumps = 0; // Reset jumps when ball collides with ground
    }
    if (y1 + ballRadius < yi) {
        Vy1 = -Vy1;
    }
    if (y1 - ballRadius < 0) {
        y1 = ballRadius;
    }
}

function obstacleCreate1() {
    if (obstacleX1 < -20) {
        obstacleX1 = randomNumber(min1, max1);
        obstacleWidth1 = randomNumber(minWidth1, maxWidth1);
        obstaclecounter1++;
        scoreCounter += 10;
    }
    Myshapes.fillStyle = "gray";
    Myshapes.fillRect(obstacleX1, obstacleY1, obstacleWidth1, obstacleHeight1);
}

function obstacleCreate2() {
    if (obstacleX2 < -20) {
        obstacleX2 = randomNumber(min1, max1);
        obstacleWidth2 = randomNumber(minWidth1, maxWidth1);
        obstaclecounter1++;
        scoreCounter += 10;
    }
    Myshapes.fillStyle = "gray";
    Myshapes.fillRect(obstacleX2, obstacleY1, obstacleWidth2, obstacleHeight1);
}

function gameDifficulty() {
    if (obstaclecounter1 >= 0 && obstaclecounter1 <= 9) {
        obstacleVelocity1 = 5;
    }
    if (obstaclecounter1 >= 10 && obstaclecounter1 <= 14) {
        obstacleVelocity1 = 6;
    }
    if (obstaclecounter1 >= 15 && obstaclecounter1 <= 19) {
        obstacleVelocity1 = 8;
    }
    if (obstaclecounter1 >= 20 && obstaclecounter1 <= 24) {
        obstacleVelocity1 = 10;
    }
    if (obstaclecounter1 >= 25 && obstaclecounter1 <= 29) {
        obstacleVelocity1 = 10.5;
    }
    if (obstaclecounter1 >= 30 && obstaclecounter1 <= 34) {
        obstacleVelocity1 = 11;
    }
    if (obstaclecounter1 >= 35 && obstaclecounter1 <= 39) {
        obstacleVelocity1 = 11.5;
    }
    if (obstaclecounter1 >= 40 && obstaclecounter1 <= 44) {
        obstacleVelocity1 = 12;
    }
    if (obstaclecounter1 >= 45 && obstaclecounter1 <= 49) {
        obstacleVelocity1 = 12.5;
    }
    if (obstaclecounter1 >= 50 && obstaclecounter1 <= 54) {
        obstacleVelocity1 = 13;
    }
    if (obstaclecounter1 >= 55) {
        obstacleVelocity1 = 13.5;
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function collideObstacle() {
    if ((x1 + ballRadius > obstacleX1 &&
            x1 - ballRadius < obstacleX1 + obstacleWidth1 &&
            y1 + ballRadius > obstacleY1 &&
            y1 - ballRadius < obstacleY1 + obstacleHeight1) ||
        (x1 + ballRadius > obstacleX2 &&
            x1 - ballRadius < obstacleX2 + obstacleWidth2 &&
            y1 + ballRadius > obstacleY1 &&
            y1 - ballRadius < obstacleY1 + obstacleHeight1)) {
        handleGameOver();
    }
}

function handleGameOver() {
    if (!gameOverSoundPlayed) { // Check if game over sound has been played
        let gameOverSound = document.getElementById("gameOverSound");
        gameOverSound.play();
        gameOverSoundPlayed = true; // Set the flag to true to indicate sound has been played
    }
    Vy1 = 0;
    obstacleVelocity1 = 0;
    Myshapes.fillStyle = "black";
    Myshapes.font = "bold 50px sans-serif";
    Myshapes.textAlign = "center";
    Myshapes.fillText("Game Over", centerX, centerY);
    myAudio.pause();
    myAudio.currentTime = 0;
    gameend = true;
}

function returnToMainMenu() {
    window.location.href = "/HTML_Folder/StartPage.html";
}
