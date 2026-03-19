const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const breathingText = document.getElementById("breathingText");
const phaseTitle = document.getElementById("phaseTitle");
const phaseInstruction = document.getElementById("phaseInstruction");
const breathingCircle = document.getElementById("breathingCircle");

let timer = null;
let running = false;
let currentPhaseIndex = 0;
let secondsLeft = 0;

const phases = [
  {
    name: "Breathe In",
    duration: 4,
    instruction: "Slowly breathe in through your nose.",
    className: "inhale"
  },
  {
    name: "Hold",
    duration: 4,
    instruction: "Hold your breath gently.",
    className: "hold"
  },
  {
    name: "Breathe Out",
    duration: 4,
    instruction: "Slowly breathe out through your mouth.",
    className: "exhale"
  }
];

function renderPhase() {
  const phase = phases[currentPhaseIndex];
  phaseTitle.textContent = `${phase.name}: ${secondsLeft}`;
  phaseInstruction.textContent = phase.instruction;
  breathingText.textContent = `${phase.name}\n${secondsLeft}`;
  breathingCircle.className = `breathing-circle ${phase.className}`;
}

function nextPhase() {
  currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
  secondsLeft = phases[currentPhaseIndex].duration;
  renderPhase();
}

function tick() {
  secondsLeft--;

  if (secondsLeft <= 0) {
    nextPhase();
  } else {
    renderPhase();
  }
}

function startBreathing() {
  if (running) return;

  running = true;
  currentPhaseIndex = 0;
  secondsLeft = phases[currentPhaseIndex].duration;
  renderPhase();

  timer = setInterval(tick, 1000);
}

function resetBreathing() {
  running = false;
  clearInterval(timer);
  timer = null;
  currentPhaseIndex = 0;
  secondsLeft = 0;

  phaseTitle.textContent = "Ready to begin";
  phaseInstruction.textContent = "Press Start to begin the breathing exercise.";
  breathingText.textContent = "Start";
  breathingCircle.className = "breathing-circle";
}

if (startBtn) {
  startBtn.addEventListener("click", startBreathing);
}

if (resetBtn) {
  resetBtn.addEventListener("click", resetBreathing);
}