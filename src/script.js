class Calculator {
    constructor(previousNumber, currentNumber){
        this.previousNumber = previousNumber;
        this.currentNumber = currentNumber;   
        this.clear();     
    }

    clear(){
        this.prevNum = "";
        this.currNum = "";
        this.operation = undefined;
    }

    delete(){
        this.currNum = this.currNum.toString().slice(0, -1);
    }

    appendNum(number){
        if (number === "." && this.currNum.includes(".")) return;

        this.currNum = this.currNum.toString() + number.toString();
    }

    selectOperation(operation){
        if (this.operation === "") return;
        if (this.prevNum !== "") {
            this.calculate();
        }
        this.operation = operation;
        this.prevNum = this.currNum;
        this.currNum = "";
        
    }

    calculate(){
        let computation = 0;
        let previous = parseFloat(this.prevNum);
        let current = parseFloat(this.currNum);

        if (isNaN(previous) || isNaN(current)) return;

        switch(this.operation){
            case "+":
                computation = previous + current;
                break;
            case "÷":
                computation = previous / current;
                break;
            case "-":
                computation = previous - current;
                break;
            case "*":
                computation = previous * current;
                break;
            default:
                return;
        }
        this.currNum = computation;
        this.operation = undefined;
        this.prevNum = "";
    }
    getDisplayNumber(number){
        const floatNum = parseFloat(number);
        const strNum = number.toString();
        const intDigits = parseFloat(strNum.split(".")[0]);
        const decimalDigit = strNum.split(".")[1]; 

        let intDisplay;
        if (isNaN(intDigits)) {
            intDisplay = "";
        } else {
            intDisplay = intDigits.toLocaleString("en", {maximumFractionDigits: 0});
        }
        if(decimalDigit != null){
            return `${intDisplay}.${decimalDigit}`;
        }
        else {
            return intDisplay;
        }
    }
    updateDisplay(){
        this.currentNumber.innerText = this.getDisplayNumber(this.currNum);
        if(this.operation != null){
            this.previousNumber.innerText = `
            ${this.getDisplayNumber(this.prevNum)} ${this.operation}`;
        } else
            this.previousNumber.innerText = "";
        
        
    }
}

const previousNumber = document.querySelector("[data-previous-number]");
const currentNumber = document.querySelector("[data-current-number]");
const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");

const calculator = new Calculator(previousNumber, currentNumber);

numberBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    });
});

operationBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.selectOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsBtn.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});

allClearBtn.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});