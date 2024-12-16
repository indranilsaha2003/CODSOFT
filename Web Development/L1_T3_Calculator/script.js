let historyDisplay = document.getElementById("history");
let resultDisplay = document.getElementById("result");
let currentInput = "";
let history = "";

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    appendInput(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    appendInput(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});


function appendInput(value) {
  if (/[+\-*/]/.test(value)) {
    if (/[+\-*/]$/.test(currentInput)) {
      currentInput = currentInput.slice(0, -1) + value;
    } else {
      currentInput += value;
    }
  } else if (
    value === "." &&
    (currentInput === "" ||
      /[+\-*/]$/.test(currentInput) ||
      currentInput
        .split(/[+\-*/]/)
        .pop()
        .includes("."))
  ) {
    return;
  } else {
    currentInput += value;
  }

  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  history = "";
  historyDisplay.textContent = "";
  resultDisplay.textContent = "0";
}

function updateDisplay() {
  const maxLength = 12;
  if (currentInput.length > maxLength) {
    resultDisplay.textContent = currentInput.slice(-maxLength);
  } else {
    resultDisplay.textContent = currentInput || "0";
  }

  if (history) {
    const historyMaxLength = 30;
    historyDisplay.textContent =
      history.length > historyMaxLength
        ? history.slice(-historyMaxLength)
        : history;
  } else {
    historyDisplay.textContent = "";
  }
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    history = currentInput;
    const result = eval(currentInput);
    if (result === Infinity || result === -Infinity) {
      resultDisplay.textContent = "Error";
      currentInput = "";
    } 
    else {
      currentInput =
        String(result).length > 12
          ? Number(result).toExponential(5)
          : String(result);
      updateDisplay();
    }
  } catch {
    resultDisplay.textContent = "Error";
    currentInput = "";
  }
}
