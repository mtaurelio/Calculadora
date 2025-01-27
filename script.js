/**Seleciona Elementos no Dom atráves de ATRIBUTOS */

const numerosBotoes = document.querySelectorAll("[data-number]");
const operadorBotoes = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const botaoLimpar = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  formatDisplayNumber(number) {
    if (number == null) return "";

    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay = isNaN(integerDigits)
      ? ""
      : integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });

    return decimalDigits != null
      ? `${integerDisplay}.${decimalDigits}`
      : integerDisplay;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;
    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "÷":
        result = _previousOperand / _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numerosBotoes.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operadorBotoes.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  console.log(
    "Calculando:",
    calculator.previousOperand,
    calculator.operation,
    calculator.currentOperand
  );
  calculator.calculate();
  calculator.updateDisplay();
});

botaoLimpar.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
