const canvas = document.getElementById('root');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.size, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    if (this.x > canvas.width + 80 || this.x < 0 - 80) {
      this.directionX = -this.directionX;
    }

    if (this.y > canvas.height + 80 || this.y < 0 - 80) {
      this.directionY = -this.directionY;
    }

    this.x += this.directionX * 0.3;
    this.y += this.directionY * 0.3;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;

  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 * 0.65;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    let color = '#7CF8B0';

    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}

function proximityLine() {
  let opacity = 1;
  for (
    let oneParticle = 0;
    oneParticle < particlesArray.length;
    oneParticle++
  ) {
    for (
      let remainsParticles = oneParticle;
      remainsParticles < particlesArray.length;
      remainsParticles++
    ) {
      let distance =
        (particlesArray[oneParticle].x - particlesArray[remainsParticles].x) *
          (particlesArray[oneParticle].x - particlesArray[remainsParticles].x) +
        (particlesArray[oneParticle].y - particlesArray[remainsParticles].y) *
          (particlesArray[oneParticle].y - particlesArray[remainsParticles].y);

      if (distance < ((canvas.width / 7) * canvas.height) / 7) {
        opacity = 1 - distance / 20000;
        context.strokeStyle = 'rgba(94, 218, 146, ' + opacity + ')';
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(
          particlesArray[oneParticle].x,
          particlesArray[oneParticle].y
        );
        context.lineTo(
          particlesArray[remainsParticles].x,
          particlesArray[remainsParticles].y
        );
        context.stroke();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }

  proximityLine();
}

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

init();
animate();
