const botoes = document.querySelectorAll("[data-number]");
const operador = document.querySelectorAll("[data-operator]");
const igual = document.querySelector("[data-equals]"); // Apenas um botão
const dellete = document.querySelector("[data-delete]");
const limpar = document.querySelector("[data-all-clear]"); // Apenas um botão
const currentText = document.querySelector("[data-current]"); // Apenas um elemento
const operandoText = document.querySelector("[data-operando]"); // Apenas um elemento

class Calculo {
  constructor(currentText, operandoText) {
    this.currentText = currentText;
    this.operandoText = operandoText;
  }

  limpar() {
    this.currentText.innerText = ""; // Limpa o display corretamente
    this.operandoText.innerText = ""; // Limpa o operando
    this.operador = undefined;
  }

  updateDisplay() {
    // Apenas exibe o conteúdo atualizado (mas já limpamos no método limpar)
    this.operandoText.innerText = this.operandoText.innerText;
    this.currentText.innerText = this.currentText.innerText;
  }
}

const calculo = new Calculo(currentText, operandoText);

limpar.addEventListener("click", () => {
  calculo.limpar();
  calculo.updateDisplay();
});
