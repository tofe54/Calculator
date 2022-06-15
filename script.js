let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false
//Bind querySelectors
const lastScreen = document.querySelector('#lastOperationScreen');
const currScreen = document.querySelector('#currentOperationScreen')
const numKeys = document.querySelectorAll('[data-number]')
const opKeys = document.querySelectorAll('[data-operator]')
const pointBtn = document.querySelector('#point-btn')
const clearBtn = document.querySelector('.clear')
const delBtn = document.querySelector('.delete')
const equalsBtn = document.querySelector('#equals-btn')

// Event Listeners

window.addEventListener('keydown', handleKeyInput)
equalsBtn.addEventListener('click', evaluate)
pointBtn.addEventListener('click', appendPoint)
clearBtn.addEventListener('click', clear)
delBtn.addEventListener('click', del)

numKeys.forEach((num) => {
    num.addEventListener('click', () => appendNumber(num.textContent))
})

opKeys.forEach((op) => {
    op.addEventListener('click', () => setOperation(op.textContent))
})

//Primary Functions

function appendNumber(number) { 
    if(currScreen.textContent === '0' || shouldResetScreen) resetScreen()
    currScreen.textContent += number
}

function resetScreen() {
    currentOperationScreen.textContent = ''
    shouldResetScreen = false
  }

function clear(){
    currScreen.textContent = '0';
    lastScreen.textContent = '';
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function del(){
    currScreen.textContent = currScreen.textContent
        .toString()
        .slice(0, -1)
}

function appendPoint() {
    if(currScreen.textContent === ' '){
        currScreen.textContent = '0'
    }
    if(currScreen.textContent.includes('.')) return
    currScreen.textContent += '.'
}

function setOperation(operator) {
    if(currentOperation !== null) evaluate()
    firstOperand = currScreen.textContent
    currentOperation = operator
    lastScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}


function evaluate() {
    if(currentOperation === null || shouldResetScreen) return
    secondOperand = currScreen.textContent
    currScreen.textContent = operate(currentOperation, firstOperand, secondOperand)
    lastScreen.textContent = ` ${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function handleKeyInput(e){
    if(e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if(e.key === '.') appendPoint()
    if(e.key === 'Backspace') del()
    if(e.key === 'Escape') clear()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if(e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '/') setOperation(convertOperator(e.key))
}


function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === 'x') return 'x'
    if (keyboardOperator === '+') return '+'
    if (keyboardOperator === '-') return '-'
}


// Operation Functions

function add (a, b) {
    return parseFloat(a) + parseFloat(b)
};

function substract (a, b) {
    return parseFloat(a) - parseFloat(b)
}

function multiply (a, b){
    return parseFloat(a) * parseFloat(b)
}

function divide (a, b) {
    if(b === 0){
        return "Quantum ERROR"
    }else{
        return parseFloat(a) / parseFloat(b)
    }
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b)
        case 'x':
            return multiply(a, b)
        case '÷':
            return divide(a, b)
        default:
            return null
    }

}

