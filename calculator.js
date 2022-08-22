let displayValue = document.querySelector('.displayContent').textContent;

function add(left, right) {
    return left + right;
}

function subtract(left, right) {
    return left - right;
}

function multiply(left, right) {
    return left * right;
}

function divide(left, right) {
    return left / right;
}

function operate(operator, left, right) {
    return operator(left, right);
}

function updateDisplay() {
    document.querySelector('.displayContent').textContent = displayValue;
    console.log(displayValue);
}

function digitPressed(e) {
    if (displayValue === '0') {
        displayValue = e.target.textContent;
    }
    else {
        displayValue = displayValue + e.target.textContent;
    }
    updateDisplay();
}

let clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    displayValue = '0';
    updateDisplay();
});

let undo = document.querySelector('.undo');
undo.addEventListener('click', () => {
    displayValue = displayValue.slice(0,-1);
    if (displayValue.length === 0) displayValue = '0';
    updateDisplay();
})

let digits = document.querySelectorAll('.digitButton');
digits.forEach(digit => {
    digit.addEventListener('click', digitPressed);
});