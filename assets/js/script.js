/*
Not working:
- If the user presses 1, then plus, then minus, then a 3. It should do 1 - 3,
  but the second operator is currently just ignored.

- If the user presses 1, plus, 2, equal, plus, equal. It should do 1 + 2 + 2.
  Currently operator followed by equal is ignored.

*/


var numberElements = document.querySelectorAll(".number");
var screenElement = document.querySelector(".screen");
var clearButton = document.querySelector(".clear");
var operatorButtons = document.querySelectorAll(".operator");

// number on the screen
var number = "";

// Holds all operations
var stack = [];



// ----------------------------------------------------------------------------
// Helper: Update screen
function updateScreen(number) {
    screenElement.innerHTML = number;
}



function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    if (operator == "plus") {
        return a + b;
    }

    if (operator == "minus") {
        return a - b;
    }

    if (operator == "times") {
        return a * b;
    }

    if (operator == "divide") {
        return a / b;
    }
}




// ----------------------------------------------------------------------------
// Number clicked
function numberButtonClicked(event) {
    var htmlElement = event.target;
    var value = htmlElement.innerText;

    number = number + value;

    // Update screen
    updateScreen(number);
}



// Operator Clicked
function operatorButtonClicked(event) {
    var htmlElement = event.target;
    var htmlOperator = htmlElement.value;

    var value = parseFloat(number);

    if (!isNaN(value)) {
        stack.push(value);
    }

    number = "";


    // If there is enough items in the stack, then let's calculate them and
    // replace them with the answer.
    if (stack.length >= 3) {
        var b = stack.pop();
        var operator = stack.pop();
        var a = stack.pop();

        var answer = calculate(a, b, operator);

        stack.push(answer);

        updateScreen(answer);
    }

    // Get the last element in the stack
    var last = stack[stack.length - 1];

    // If the operator isn't equal AND
    // the last element in the stack isn't a number THEN
    // push the operator to the stack.
    if (htmlOperator != "equals" && !isNaN(last)) {
        stack.push(htmlOperator);
    }
}



// Clear button
function clearButtonClicked(event) {
    // reset all numbers
    stack = [];
    number = "";

    // clear screen
    updateScreen(0);
}



// ----------------------------------------------------------------------------
// Event listeners

// Add event listeners for all number buttons
for (var i = 0; i < numberElements.length; i++) {
    numberElements[i].addEventListener("click", numberButtonClicked);
}

// Add event listeners for all operand buttons
for (var i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", operatorButtonClicked);
}

clearButton.addEventListener("click", clearButtonClicked);
