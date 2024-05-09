class Stickman {
    constructor() {
      this.stickmanElement = document.getElementById("stickman");
      this.positionX = 0;
    }

    moveLeft() {
      this.positionX -= 10;
      this.stickmanElement.style.left = this.positionX + "px";
    }

    moveRight() {
      this.positionX += 10;
      this.stickmanElement.style.left = this.positionX + "px";
    }
  }

  const stickman = new Stickman();

  document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
      stickman.moveLeft();
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
      stickman.moveRight();
    }
  });