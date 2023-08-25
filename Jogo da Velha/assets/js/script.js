// selecionando todas as celulas com o atributo data-cell
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winnigCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  for (const cell of cellElements) {
    // para cada elemento dentro de cellElements adiciona um event listener que chama a função handle click e executa apenas uma vez (onde:true)
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);

    cell.addEventListener("click", handleClick, { once: true });
  }
  isCircleTurn = false;

  board.classList.add("x");
  winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "O Venceu!"
      : "X venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};

const handleRestartButton = () => {};

const checkForWin = (currentPlayer) => {
  // verificando na lista winnigCombinations se alguma combinação de vitoria está preenchida com a classe do jogador atual
  return winnigCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  // verificando se todas as celulas possuem a classe x ou circulo e nao ocorreu a vitoria
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const handleClick = (e) => {
  // colocar o x ou circulo
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);
  // verificar vitoria
  const isWin = checkForWin(classToAdd);
  // verificar empate
  const isDraw = checkForDraw();
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // mudar simbolo
    swapTurns();
  }
};

startGame();
restartButton.addEventListener("click", startGame);
