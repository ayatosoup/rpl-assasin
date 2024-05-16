class StickmanGame {
    constructor() {
        this.player = document.getElementById("player");
        this.enemy = document.getElementById("enemy");
        this.miniboss = document.getElementById("miniboss");
        this.questionKotak = document.querySelector(".question-kotak");
        this.questionContainer = document.getElementById("questionBox");
        this.answerContainer = document.getElementById("answerBox");
        this.timerContainer = document.getElementById("timer");
        this.healthBar = document.getElementById("healthBar");
        this.winLink = document.getElementById("winLink");
        this.enemySpawned = false;
        this.minibossSpawned = false;
        this.minibossHealth = 2; // Miniboss requires 2 hits
        this.playerPositionX = 0;
        this.enemyPositionX = window.innerWidth - this.enemy.offsetWidth;
        this.maxAttempts = 3;
        this.remainingAttempts = this.maxAttempts;
        this.correctAnswerIndex = 1; // Assume the second answer is correct
        this.timer = null;
        this.timeLeft = 30; // Timer duration in seconds

        document.addEventListener("keydown", this.movePlayer.bind(this));
    }

    movePlayer(event) {
        if (event.key === "ArrowLeft") {
            this.moveLeft();
        } else if (event.key === "ArrowRight") {
            this.moveRight();
        }
    }

    moveLeft() {
        this.playerPositionX -= 10;
        this.player.style.left = this.playerPositionX + "px";
    }

    moveRight() {
        this.playerPositionX += 10;
        this.player.style.left = this.playerPositionX + "px";
        if (!this.enemySpawned && this.playerPositionX > window.innerWidth / 4) {
            this.spawnEnemy();
        }
    }

    spawnEnemy() {
        this.enemySpawned = true;
        this.enemy.classList.remove("hidden");
        this.showQuestionAndAnswers();
        this.startTimer();
    }

    showQuestionAndAnswers() {
        const question = "Ini adalah pertanyaan yang muncul ketika musuh muncul di sebelah kanan layar";
        this.questionContainer.innerHTML = question;

        const answers = ["Jawaban 1", "Jawaban 2", "Jawaban 3", "Jawaban 4"];
        this.answerContainer.innerHTML = "";
        answers.forEach((answer, index) => {
            const answerElement = document.createElement("div");
            answerElement.classList.add("answer");
            answerElement.textContent = `${index + 1}. ${answer}`;
            answerElement.addEventListener("click", () => this.checkAnswer(index));
            this.answerContainer.appendChild(answerElement);
        });

        this.questionKotak.style.display = "block";
    }

    checkAnswer(selectedIndex) {
        if (selectedIndex === this.correctAnswerIndex) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }
    }

    correctAnswer() {
        clearInterval(this.timer); // Stop the timer
        if (this.minibossSpawned) {
            this.minibossHealth -= 1;
            if (this.minibossHealth <= 0) {
                this.winGame();
            } else {
                alert("Miniboss terkena serangan! Butuh 1 serangan lagi untuk mengalahkan miniboss.");
                this.showQuestionAndAnswers(); // Show next question for miniboss
                this.startTimer(); // Restart the timer for next question
            }
        } else {
            this.spawnMiniboss();
        }
    }

    wrongAnswer() {
        this.remainingAttempts -= 1;
        this.updateHealthBar();
        if (this.remainingAttempts > 0) {
            alert(`Jawaban salah. Anda memiliki ${this.remainingAttempts} kesempatan lagi.`);
        } else {
            this.gameOver();
        }
    }

    startTimer() {
        this.timeLeft = 30; // Reset the timer
        this.updateTimerDisplay();
        this.timer = setInterval(() => {
            this.timeLeft -= 1;
            this.updateTimerDisplay();
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.gameOver();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        this.timerContainer.textContent = `Waktu tersisa: ${this.timeLeft} detik`;
    }

    updateHealthBar() {
        const healthPercentage = (this.remainingAttempts / this.maxAttempts) * 100;
        this.healthBar.style.width = `${healthPercentage}%`;
    }

    spawnMiniboss() {
        this.enemy.classList.add("hidden");
        this.miniboss.classList.remove("hidden");
        this.minibossSpawned = true;
        alert("Miniboss muncul! Jawab 2 Pertanyaan untuk kalahkan miniboss.");
        this.showQuestionAndAnswers();
        this.startTimer(); 
    }

    winGame() {
        clearInterval(this.timer); // Stop the timer
        alert("Kamu menang!");
        this.goToNextLevel();
    }

    gameOver() {
        clearInterval(this.timer); // Stop the timer
        alert("Kamu kalah!");
        window.location.href = gameRoute;
    }

    goToNextLevel() {
        localStorage.setItem('stage2Unlocked', 'true');
        window.location.href = stageRoute;
    }
}

const stickmanGame = new StickmanGame();
