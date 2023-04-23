class Calculator {
    constructor(PREV_OPERAND_TEXT,CURR_OPERAND_TEXT){
        this.PREV_OPERAND_TEXT = PREV_OPERAND_TEXT;
        this.CURR_OPERAND_TEXT = CURR_OPERAND_TEXT;
        this.resultDisplayed = false;
        this.clear();
    }

    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(this.resultDisplayed === true && this.operation === undefined){
            this.clear();
            this.resultDisplayed = false;
        }
        if(number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === "") return;
        if(this.previousOperand !== ""){
            this.compute();
        }
        this.operation = operation;
        this.lastOperation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";

    }

    operate(){
        let computation;
        let activeOperation = this.operation;
        if(activeOperation === undefined) activeOperation = this.lastOperation;
        const PREV = parseFloat(this.previousOperand);
        const CURR = parseFloat(this.currentOperand);
        if(isNaN(PREV) || isNaN(CURR)) return;
        switch (activeOperation){
            case "+":
                computation = PREV + CURR;
                break;
            case "-":
                computation = PREV - CURR;
                break;
            case "x":
                computation = PREV * CURR;
                break;
            case "÷":
                computation = PREV/CURR;
                break;
            default:
                return;
        }
        this.previousOperand = this.currentOperand;
        this.currentOperand = Math.round(computation*100)/100;
        this.operation = undefined;
    }

    getDisplayNumber(number){
        const STRING_NUMBER = number.toString();
        const INT_DIGITS = parseFloat(STRING_NUMBER.split(".")[0]);
        const DEC_DIGITS = STRING_NUMBER.split(".")[1];
        let integerDisplay;
        if (isNaN(INT_DIGITS)){
            integerDisplay = "";
        } else {
            integerDisplay = INT_DIGITS.toLocaleString("en",{maximumFractionDigits: 0});
        }
        if(DEC_DIGITS != null){
            return `${integerDisplay}.${DEC_DIGITS}`;
        }else{
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.CURR_OPERAND_TEXT.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation === undefined){
            this.PREV_OPERAND_TEXT.innerText = "";
        }else{
            this.PREV_OPERAND_TEXT.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }
    }
}

const NUMBER_BTNS = document.querySelectorAll("[data-number]");
const OPERATION_BTNS = document.querySelectorAll("[data-operation]");
const EQUALS_BTN = document.querySelector("[data-equals]");
const DELETE_BTN = document.querySelector("[data-delete]");
const ALL_CLEAR_BTN = document.querySelector("[data-all-clear]");
const PREV_OPERAND_TEXT = document.querySelector("[data-previous-operand]");
const CURR_OPERAND_TEXT = document.querySelector("[data-current-operand]");

const CALCULATOR = new Calculator(PREV_OPERAND_TEXT, CURR_OPERAND_TEXT);

NUMBER_BTNS.forEach(btn => {
    btn.addEventListener("click",() => {
        CALCULATOR.appendNumber(btn.innerText);
        CALCULATOR.updateDisplay();
    })
})

OPERATION_BTNS.forEach(btn => {
    btn.addEventListener("click",() => {
        CALCULATOR.chooseOperation(btn.innerText);
        CALCULATOR.updateDisplay();
    })
})

EQUALS_BTN.addEventListener("click",button => {
    CALCULATOR.operate();
    CALCULATOR.resultDisplayed = true;
    CALCULATOR.updateDisplay();
})

ALL_CLEAR_BTN.addEventListener("click",button =>{
    CALCULATOR.clear();
    CALCULATOR.updateDisplay();
})

DELETE_BTN.addEventListener("click",button =>{
    CALCULATOR.delete();
    CALCULATOR.updateDisplay();
})