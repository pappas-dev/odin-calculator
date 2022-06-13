//* calculator math function
const calculate = (a, operator, b) => {
    let result = '';

    if (operator === 'add') {
        result = parseFloat(a) + parseFloat(b);
    } else if (operator === 'subtract') {
        result = parseFloat(a) - parseFloat(b);
    } else if (operator === 'multiply') {
        result = parseFloat(a) * parseFloat(b);
    } else if (operator === 'divide') {
        result = parseFloat(a) / parseFloat(b);
    }
    return result;
}

//* have buttons send numbers to display.
const calculator = document.querySelector('.calc');
const keys = document.querySelector('.calckeys');
const display = document.querySelector('.display');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
            if (
                displayedNum === '0' || 
                previousKeyType === 'operator' ||
                previousKeyType ==='calculate'
                ) {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKey = 'number';
        } if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        if (
            firstValue &&
            operator &&
            previousKeyType !== 'operator'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            } else {
                calculator.dataset.firstValue = displayedNum;
            }
    key.classList.add('is-depressed');
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.operator = action;    
    } if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.';
            calculator.dataset.previousKey = 'decimal';
        }
    } if (action === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = '';
            calculator.dataset.modValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.previousKeyType = '';
        } else {
            key.textContent = 'AC';
        }

        display.textContent = 0;
        calculator.dataset.previousKeyType = 'clear';
    } if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;
      if (firstValue) {
          if (previousKeyType === 'calculate') {
              firstValue = displayedNum;
              secondValue = calculator.dataset.modValue; 
          } if (action !== 'clear') {
              const clearButton = calculator.querySelector('[data-action=clear]');
              clearButton.textContent = 'CE';
          }
        display.textContent = calculate(firstValue, operator, secondValue)
      }
    calculator.dataset.modValue = secondValue
    calculator.dataset.previousKeyType = 'calculate';
    }
    Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'))
    }
})