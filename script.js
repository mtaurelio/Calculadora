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
/** previos = anteior!
 * current = atual! ou seja, conteudo atual e anterior da calculadora!
 */

/**Metodo constructor: Calculator = calculadora
 * a class recebe dois paramentros, o anterior e o atual ou = o previos e o current.
 *ambos os this, servem para guardar os elementos anteriores e atuais digitados.
 * O método `clear()` é chamado para inicializar os valores da calculadora.
 */
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  /**Função responsavel pela FORMATAÇÃO dos numeros que serão exibidos na interface da calculadora e ajustes visuais. 
   * recebe number como parametro pois se trata de numeros. 
   
   * Verificação:  if (number == null) return "";:
   Se o número for null, a função retorna uma string vazia.

   *Divisão do número em partes (inteiro e decimal): O número é transformado em uma string e, em seguida, é feito um split para separar a parte inteira e a parte decimal.
   */
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

  /**Função de deletar: A função manipula o elemento atual através do currentOperand transformado em string, o metodo slice(0,-1) retira o ultimo caractere, assim, sempre que apertar o botao DEL o ultimo numero/string digitado será deletado! */
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  /**
   *Função calculate: nas duas constantes: transforma o conteudo atual e anterior em string (se necessario e retorna em numero flutuante (decimal))

   * 
   */
  calculate() {
    // variavel que vai armazenar o resultado da operação
    let result;
    // Converte os operandos para números, caso não sejam válidos, retorna undefined
    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    // Verifica se algum dos operandos não é um número válido, e retorna sem fazer nada
    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    // Realiza operações CASO o operador seja escolhido!
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
      // caso nenhum seja escolhido, não faz nada!
      default:
        return;
    }

    //atualiza o operando atual com o resultado da operação
    this.currentOperand = result;

    // Limpa o operador e o operando anterior para o próximo cálculo
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    // se o atual estiver vazio, ele retorna e nao faz nada!
    if (this.currentOperand === "") return;

    // se o anterior não estiver vazio, a função calculate é chamada!
    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  /** metodo que verifica se o usuario digitou "." na operação e não permite que ele digite mais de uma vez */
  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  /** Botão que realiza a limpeza dos operadores */
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  /** exibe o operando anterior e o atual de maneira organizada
   *
   *Anterior: 25 +
Atual: 50
   */
  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

/**Botoes da interface, com a estrutura da constructor principal. */
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
