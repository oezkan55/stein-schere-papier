import {
  removeConfettiInner,
  startConfettiInner,
  stopConfettiInner,
} from "./libraries/confetti";

const playerScoreEl = document.querySelector(".player__score");
const playerChoiceEl = document.querySelector(".player__choice");
const computerScoreEl = document.querySelector(".computer__score");
const computerChoiceEl = document.querySelector(".computer__choice");
const resultText = document.querySelector(".result__text");
const resetBtn = document.querySelector(".btn-reset");

const playerChoiceBox = document.querySelector(".player__icons");

const playerIcons = document.querySelectorAll(".player__icon");
const computerIcons = document.querySelectorAll(".computer__icon");
const allGameIcons = [...playerIcons, ...computerIcons];

const choices = {
  stein: { name: "stein", siegUeber: ["schere", "echse"] },
  papier: { name: "papier", siegUeber: ["stein", "spock"] },
  schere: { name: "schere", siegUeber: ["papier", "echse"] },
  echse: { name: "echse", siegUeber: ["papier", "spock"] },
  spock: { name: "spock", siegUeber: ["schere", "stein"] },
};

let playerScore = 0;
let computerScore = 0;
let computerChoice;
let player = {};

const resetSelected = function () {
  allGameIcons.forEach(p_icon => {
    p_icon.classList.remove("selected");
  });
  stopConfettiInner();
  removeConfettiInner();
};

const resetGame = function () {
  [playerScoreEl, computerScoreEl].forEach(p_el => (p_el.textContent = 0));

  [playerChoiceEl, computerChoiceEl, resultText].forEach(
    p_el => (p_el.textContent = "")
  );

  [playerScore, computerScore].forEach(p_el => (p_el = 0));
};

const computerRandomChoice = function () {
  const computerChoiceNumber = Math.random();

  if (computerChoiceNumber < 0.2) return (computerChoice = "schere");

  if (computerChoiceNumber <= 0.4) return (computerChoice = "stein");

  if (computerChoiceNumber <= 0.6) return (computerChoice = "papier");

  if (computerChoiceNumber <= 0.8) return (computerChoice = "echse");

  return (computerChoice = "spock");
};

const displayComputerChoice = function () {
  computerRandomChoice();

  computerIcons.forEach(p_iconEl => {
    if (p_iconEl.getAttribute("data-choise") === computerChoice)
      p_iconEl.classList.add("selected");
  });

  computerChoiceEl.textContent = `--- ${computerChoice}`;
};

const displayPlayerChoice = function () {
  player.choice = player.element.getAttribute("data-choice");
  player.element.classList.add("selected");

  playerChoiceEl.textContent = `--- ${player.choice}`;
};

const checkResult = function (p_playerChoice) {
  const choice = choices[p_playerChoice];

  if (p_playerChoice === computerChoice) return displayResult("Unentschieden");

  //? Spieler Gewinnt, wenn Computerwahl im Array "siegUeber" enthalten ist
  if (choice.siegUeber.indexOf(computerChoice) > -1)
    return displayResult("Sieg");

  //? Computer Gewinnt, wenn Computerwahl NICHT im Array "siegUeber" enthalten ist
  if (choice.siegUeber.indexOf(computerChoice) === -1)
    return displayResult("Niederlage");
};

const displayResult = function (p_result) {
  if (p_result === "Sieg") {
    playerScoreEl.textContent = ++playerScore;
    resultText.textContent = "Du hast gewonnen";
    startConfettiInner();
  }

  if (p_result === "Niederlage") {
    computerScoreEl.textContent = ++computerScore;
    resultText.textContent = "Du hast verloren";
  }

  if (p_result === "Unentschieden") resultText.textContent = "Unentschieden";
};

const result = function (p_playerChoice) {
  checkResult(p_playerChoice);
};

//?+-+-+-+-+-+-+- EVENTS -+-+-+-+-+-+-+--+-+-+
playerChoiceBox.addEventListener("click", e => {
  resetSelected();
  player.element = e.target.closest(".player__icon");

  if (!player) return;

  stopConfettiInner();
  removeConfettiInner();
  displayComputerChoice();
  displayPlayerChoice();
  result(player.choice);
});

resetBtn.addEventListener("click", () => {
  resetSelected();
  resetGame();
});
