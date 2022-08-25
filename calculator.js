// TODO:
// bug test
// css
// keyboard support
// rounding

let displayValue = document.querySelector('.displayContent').textContent;
let decimalPoint = false;
let operation = '';
let operationReplace = false;
let storedValue = 0;

function add(left, right) {
    return Number(left) + Number(right);
}

function subtract(left, right) {
    return Number(left) - Number(right);
}

function multiply(left, right) {
    return Number(left) * Number(right);
}

function divide(left, right) {
    if (right === '0') {
        alert('No.\nCannot divide by 0.');
        return null;
    }
    return Number(left) / Number(right);
}

function operate(operator, left, right) {
    if (operator(left, right) === null) {
        return;
    }
    displayValue = operator(left, right);
    switch (operation) {
        case '+':
            addition.classList.remove('activeOperator');
            break;
        case '-':
            subtraction.classList.remove('activeOperator');
            break;
        case '*':
            multiplication.classList.remove('activeOperator');
            break;
        case '/':
            division.classList.remove('activeOperator');
            break;
        default:
            break;
    }
    operation = '';
    storedValue = 0;
    operationReplace = false;
    updateDisplay();
}

function storedOperation() {
    if (operation !== '') {
        switch(operation) {
            case '+':
                operate(add, storedValue, displayValue);
                storedValue = displayValue;
                return true;
            case '-':
                operate(subtract, storedValue, displayValue);
                storedValue = displayValue;
                return true;
            case '*':
                operate(multiply, storedValue, displayValue);
                storedValue = displayValue;
                return true;
            case '/':
                operate(divide, storedValue, displayValue);
                if (displayValue != 0) {
                    storedValue = displayValue;
                }
                return true;
            default:
                break;
        }
    }
    storedValue = displayValue;
    displayValue = '0';
    updateDisplay();
    return false;
}

// Helper function to update the display
function updateDisplay() {
    document.querySelector('.displayContent').textContent = displayValue;
}

// Replaces displayValue with 0
function clearPressed() {
    displayValue = '0';
    decimalPoint = false;
    updateDisplay();
}

// Removes last digit of displayValue
function undoPressed() {
    // displayValue[-1] returned undefined
    if (displayValue.slice(-1, displayValue.length) === '.') decimalPoint = false;
    displayValue = displayValue.slice(0,-1);
    if (displayValue.length === 0) displayValue = '0';
    updateDisplay();
}

// Adds number to end of display
// If the display value is 0, replaces the 0 with number
function digitPressed(e) {
    if (operationReplace === true) {
        displayValue = '0';
        operationReplace = false;
    }
    if (displayValue === '0' && !(e.target.textContent === '.')) {
        displayValue = e.target.textContent;
    }
    else {
        if (e.target.textContent === '.') {
            if (!decimalPoint) {
                decimalPoint = true;
                displayValue = displayValue + e.target.textContent;
            }
        }
        else {
            displayValue = displayValue + e.target.textContent;
        }
    }

    updateDisplay();
}

// Event Listeners

let clear = document.querySelector('.clear');
clear.addEventListener('click', clearPressed);

// Add event for backspace button
let undo = document.querySelector('.undo');
undo.addEventListener('click', undoPressed)

// Add events for all digit buttons
let digits = document.querySelectorAll('.digitButton');
digits.forEach(digit => {
    digit.addEventListener('click', digitPressed);
});

// Add events for all operator buttons
let addition = document.querySelector('.addition');
addition.addEventListener('click', () => {
    storedOperation();
    operation = '+';
    addition.classList.add('activeOperator');
    operationReplace = true;
});

let subtraction = document.querySelector('.subtract');
subtraction.addEventListener('click', () => {
    storedOperation();
    operation = '-';
    subtraction.classList.add('activeOperator');
    operationReplace = true;
});

let multiplication = document.querySelector('.multiply');
multiplication.addEventListener('click', () => {
    storedOperation();
    operation = '*';
    multiplication.classList.add('activeOperator');
    operationReplace = true;
});

let division = document.querySelector('.divide');
division.addEventListener('click', () => {
    storedOperation();
    operation = '/';
    division.classList.add('activeOperator');
    operationReplace = true;
});

let evaluation = document.querySelector('.evaluate');
evaluation.addEventListener('click', () => {
    if (operation !== '') storedOperation();
});