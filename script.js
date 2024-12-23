let snake = [{ x: 5, y: 5 }];
let direction = 'right';
let food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
let score = 0;
let gameOver = false;

const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const playAgainButton = document.getElementById('playAgain');

playAgainButton.addEventListener('click', () => {
  window.location.reload();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
  if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
});

setInterval(() => {
  if (gameOver) return;

  const newSnake = [...snake];
  const head = newSnake[0];

  if (direction === 'right') newSnake.unshift({ x: head.x + 1, y: head.y });
  if (direction === 'left') newSnake.unshift({ x: head.x - 1, y: head.y });
  if (direction === 'up') newSnake.unshift({ x: head.x, y: head.y - 1 });
  if (direction === 'down') newSnake.unshift({ x: head.x, y: head.y + 1 });

  if (newSnake[0].x === food.x && newSnake[0].y === food.y) {
    food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    score++;
  } else {
    newSnake.pop();
  }

  if (newSnake[0].x < 0 || newSnake[0].x > 19 || newSnake[0].y < 0 || newSnake[0].y > 19) {
    gameOver = true;
  }

  for (let i = 1; i < newSnake.length; i++) {
    if (newSnake[0].x === newSnake[i].x && newSnake[0].y === newSnake[i].y) {
      gameOver = true;
    }
  }

  snake = newSnake;

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  snake.forEach((part) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(part.x * 20, part.y * 20, 20, 20);
  });
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

  scoreElement.textContent = `Score: ${score}`;
  if (gameOver) gameOverElement.textContent = 'Game Over!';
}, 100);