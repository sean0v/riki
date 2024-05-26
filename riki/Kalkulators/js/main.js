let input = '';
let memory = '';
let operator = '';

function appendToDisplay(value) {
    input += value;
    document.getElementById('display').value = input;
}


function clearDisplay() {
    input = '';
    document.getElementById('display').value = '';
}

function setOperator(op) {
    operator = op;
    memory = input;
}

function calculate(expression) {
    let output = evaluateExpression(expression);
    document.getElementById('display').value = output;
    input = output;
    operator = '';
    memory = '';
}

function evaluateExpression(expression) {
    // Declare the operators array here
    const operators = ['+', '-', '*', '/'];

    // Split the expression into tokens based on operators and whitespace
    const tokens = expression.split(/([+\-*/()\s])/).filter((token) => token.trim() !== '');

    const operatorStack = [];
    const valueStack = [];

    const precedence = (operator) => {
        if (operator === '+' || operator === '-') {
            return 1;
        } else if (operator === '*' || operator === '/') {
            return 2;
        }
        return 0;
    };

    tokens.forEach((token) => {
        if (!isNaN(token)) {
            valueStack.push(parseFloat(token));
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                performOperation();
            }
            if (operatorStack[operatorStack.length - 1] === '(') {
                operatorStack.pop(); // Remove the open parenthesis
            } else {
                // Mismatched parentheses
                alert("Error: Invalid expression");
                clearDisplay();
                return NaN;
            }
        } else if (operators.includes(token)) {
            const currentPrecedence = precedence(token);
            while (
                operatorStack.length > 0 &&
                precedence(operatorStack[operatorStack.length - 1]) >= currentPrecedence
            ) {
                performOperation();
            }
            operatorStack.push(token);
        }
    });

    while (operatorStack.length > 0) {
        performOperation();
    }

    if (valueStack.length === 1 && operatorStack.length === 0) {
        return valueStack[0];
    } else {
        // Mismatched operators or parentheses
        alert("Error: Invalid expression");
        clearDisplay();
        return NaN;
    }

    function performOperation() {
        const operator = operatorStack.pop();
        const right = valueStack.pop();
        const left = valueStack.pop();
        if (operator === '+') {
            valueStack.push(left + right);
        } else if (operator === '-') {
            valueStack.push(left - right);
        } else if (operator === '*') {
            valueStack.push(left * right);
        } else if (operator === '/') {
            if (right === 0) {
                clearDisplay();
                throw new Error("Division by zero");
            }
            valueStack.push(left / right);
        }
    }
}
function calculateAdvanced(operation) {
    const value = parseFloat(input);
    let result;
    switch (operation) {
        case 'sqrt':
            result = Math.sqrt(value);
            break;
        case 'sin':
            result = Math.sin(value);
            break;
        case 'cos':
            result = Math.cos(value);
            break;
        case 'tan':
            result = Math.tan(value);
            break;
        case 'log':
            result = Math.log(value);
            break;
        default:
            break;
    }
    document.getElementById('display').value = result;
    input = result.toString();
}

// Add event listeners for numpad keys
document.addEventListener('keydown', function (event) {
    if (!isNaN(event.key) || event.key === '.' || ['+', '-', '*', '/'].includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter') {
        calculate(document.getElementById('display').value);
    } else if (event.key === 'Escape') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        input = input.slice(0, -1);
        document.getElementById('display').value = input;
    }
});
