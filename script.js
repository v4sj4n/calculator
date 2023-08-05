const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const numberInput = document.querySelector('#number-input')
const clearAllEl = document.querySelector('#clear-all')
const clearOneEl = document.querySelector('#clear-one')
const prevOperationEl = document.querySelector('#prev-operation')
const equals = document.querySelector('#equals')

const numberObject = {
    currentNumber: 0,
    currentOperator: ''
}

clearAllEl.addEventListener("click", () => {
    numberInput.value = ""
})
clearOneEl.addEventListener("click", () => {
    numberInput.value = numberInput.value.slice(0, -1);
})

numberInput.value = numberObject.currentNumber

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (number.textContent === '.' && numberInput.value.includes('.')) {
            return;
        }
        else if (number.textContent !== '0' && numberInput.value.length >= 1 && numberInput.value === "0" && number.textContent !== '.') {
            numberInput.value = number.textContent;
            return

        }
        numberInput.value += number.textContent;
    });
});

function calcul(num1, operator, num2) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "÷":
            return num1 / num2
        case "x":
            return num1 * num2;
        case "%":
            return num1 % num2;
        default:
            break;
    }
}

function operatorHandler(op) {
    const calculatedValue = calcul(numberObject.currentNumber, numberObject.currentOperator, parseFloat(numberInput.value))
    numberInput.value = ""
    numberObject.currentNumber = calculatedValue
    numberObject.currentOperator = op
    prevOperationEl.textContent = `${calculatedValue} ${op}`
}



operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (numberObject.currentOperator == '') {
            numberObject.currentOperator = operator.textContent
            numberObject.currentNumber = Number(numberInput.value)
            prevOperationEl.textContent = `${Number(numberInput.value)} ${operator.textContent}`
            numberInput.value = ""
        }
        else if (numberObject.currentNumber != '' && numberInput.value != '') {
            operatorHandler(operator.textContent)
        }
        else if (numberInput.value == '') {
            numberObject.currentOperator = operator.textContent
            prevOperationEl.textContent = `${numberObject.currentNumber} ${numberObject.currentOperator}`

        }

    })
});

equals.addEventListener('click', () => {
    const calculatedValueEqual = calcul(numberObject.currentNumber, numberObject.currentOperator, Number(numberInput.value))
    numberInput.value = calculatedValueEqual
    numberObject.currentNumber = 0
    numberObject.currentOperator = ""
    prevOperationEl.textContent = "⠀"

})