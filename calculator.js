let displayValue = document.querySelector('.displayContent').textContent;
let decimalPoint = false;
let operation = '';
let operationReplace = false;
let storedValue = 0;

function add(left, right) {
    return Number((Number(left) + Number(right)).toFixed(3));
}

function subtract(left, right) {
    return Number((Number(left) - Number(right)).toFixed(3));
}

function multiply(left, right) {
    return Number((Number(left) * Number(right)).toFixed(3));
}

function divide(left, right) {
    if (right === '0' || right === 0) {
        alert('No.\nCannot divide by 0.');
        return null;
    }
    return Number((Number(left) / Number(right)).toFixed(3));
}

function operate(operator, left, right) {
    if (operator(left, right) === null) {
        return false;
    }
    displayValue = operator(left, right);
    operation = '';
    storedValue = 0;
    operationReplace = false;
    updateDisplay();
    return true;
}

function storedOperation(op) {
    let divideByZero = false;

    if (operation !== '') {
        switch(operation) {
            case '+':
                operate(add, storedValue, displayValue);
                storedValue = displayValue;
                addition.classList.remove('activeOperator');
                displayValue = '0';
                break;
            case '-':
                operate(subtract, storedValue, displayValue);
                storedValue = displayValue;
                subtraction.classList.remove('activeOperator');
                displayValue = '0';
                break;
            case '*':
                operate(multiply, storedValue, displayValue);
                storedValue = displayValue;
                multiplication.classList.remove('activeOperator');
                displayValue = '0';
                break;
            case '/':
                console.log(`${displayValue} ${storedValue}`)
                if (operate(divide, storedValue, displayValue)) {
                    if (displayValue != 0) {
                        storedValue = displayValue;
                    }
                    division.classList.remove('activeOperator');
                }
                else {
                    divideByZero = true;
                }
                console.log(`${displayValue} ${storedValue}`)
                displayValue = '0';
                break;
            default:
                break;
        }
    }
    else {
        storedValue = displayValue;
        displayValue = '0';
        updateDisplay();
    }
    
    if (!divideByZero) {
        switch(op) {
            case '+':
                operation = '+';
                addition.classList.add('activeOperator');
                break;
            case '-':
                operation = '-';
                subtraction.classList.add('activeOperator');
                break;
            case '*':
                operation = '*';
                multiplication.classList.add('activeOperator');
                break;
            case '/':
                operation = '/';
                division.classList.add('activeOperator');
                break;
            default:
                break;
        }
        operationReplace = true;
    }
}

// Helper function to update the display
function updateDisplay() {
    document.querySelector('.displayContent').textContent = displayValue;
}

// Replaces displayValue with 0
function clearPressed() {
    let operatorButtons = document.querySelectorAll('.operators button');
    operatorButtons.forEach(op => {
        if (op.classList.contains('activeOperator')) op.classList.remove('activeOperator');
    });
    displayValue = '0';
    decimalPoint = false;
    operation = '';
    storedValue = 0;
    operationReplace = false;
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

function keyboardPressed(e) {
    console.log(e.keyCode);
    if (e.shiftKey) {
        switch(e.keyCode) {
            case 187:
                storedOperation('+');
                break;
            case 56:
                storedOperation('*');
                break;
            default:
                break;
        }
    }
    else {
        // digits
        if (e.keyCode > 47 && e.keyCode < 58 || e.keyCode === 190) {
            let num = Number(e.keyCode) - 48;
            if (e.keyCode === 190) num = '.';
            
            if (operationReplace === true) {
                displayValue = '0';
                operationReplace = false;
            }
            if (displayValue === '0' && !(num === '.')) {
                displayValue = num;
            }
            else {
                if (num === '.') {
                    if (!decimalPoint) {
                        decimalPoint = true;
                        displayValue = `${displayValue}${num}`;
                    }
                }
                else {
                    displayValue = `${displayValue}${num}`;
                }
            }
        
            updateDisplay();
        }
        // unmodified keyboard operators
        else {
            // 13 enter
            // 187 =+
            // 189 -_
            // 191 /?
            switch(e.keyCode) {
                case 189:
                    storedOperation('-');
                    break;
                case 191:
                    storedOperation('/');
                    break;
                case 13:
                case 187:
                    if (operation !== '') storedOperation();
                    break;
                case 8:
                    undoPressed();
                    break;
                default:
                    break;
            }
        }
    }
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
    storedOperation('+');
});

let subtraction = document.querySelector('.subtract');
subtraction.addEventListener('click', () => {
    storedOperation('-');
});

let multiplication = document.querySelector('.multiply');
multiplication.addEventListener('click', () => {
    storedOperation('*');
});

let division = document.querySelector('.divide');
division.addEventListener('click', () => {
    storedOperation('/');
});

let evaluation = document.querySelector('.evaluate');
evaluation.addEventListener('click', () => {
    if (operation !== '') storedOperation();
});

// detect keypresses
window.addEventListener('keydown', keyboardPressed);