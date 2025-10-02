// ======= VARIABLES =======
const inputElement = document.querySelector('input');
const historyElement = document.getElementById("history");
const buttons = document.querySelectorAll('button');

let history = [];
let historyCounter = 1;
let calculationString = '';
let resultDisplayed = false;

// ======= HELPER FUNCTIONS =======
const updateDisplay = () => {
    inputElement.value = calculationString;
    inputElement.scrollLeft = inputElement.scrollWidth;
}

const addToHistory = (entry) => {
    history.push(`Calculation ${historyCounter}:\n${entry}`);
    historyCounter++;
    historyElement.value = history.join("\n\n");
}

const calculate = () => {
    if (!calculationString) return;

    try {
        const result = eval(calculationString);
        inputElement.value = result;
        addToHistory(`${calculationString} = ${result}`);
        calculationString = result.toString();
        resultDisplayed = true;
    } catch {
        inputElement.value = "Error";
        calculationString = '';
        resultDisplayed = false;
    }
}

const handleInput = (value) => {
    if (resultDisplayed && !['+', '-', '*', '/'].includes(value)) {
        calculationString = '';
        resultDisplayed = false;
    }
    calculationString += value;
    updateDisplay();
}

// ======= BUTTON CLICK HANDLER =======
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerHTML;

        switch (value) {
            case '=':
                calculate();
                break;
            case 'AC':
                calculationString = '';
                resultDisplayed = false;
                updateDisplay();
                break;
            case 'C':
                calculationString = calculationString.slice(0, -1);
                updateDisplay();
                break;
            default:
                handleInput(value);
        }
    });
});

// ======= KEYBOARD INPUT SUPPORT =======
document.addEventListener('keydown', (e) => {
    const allowedKeys = '0123456789+-*/.%';

    if (allowedKeys.includes(e.key)) {
        handleInput(e.key);
    }
    else if (e.key === 'Enter') {
        calculate();
    }
    else if (e.key === 'Backspace') {
        calculationString = calculationString.slice(0, -1);
        updateDisplay();
    }
    else if (e.key === 'Escape') {
        calculationString = '';
        resultDisplayed = false;
        updateDisplay();
    }
});