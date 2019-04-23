/*

Notes:

- This is one way of many possible ways of creating the calculator.
- To help in the learning process, all variables and functions created by the
  programmer contain an underscore (_). This is not the normal pattern of
  variable naming. It's just used here to help the student learn what is created
  by the programmer and what is native to the JavaScript language.
-

Not working by choice:

- If the user presses 1, then plus, then minus, then a 3. It should do 1 - 3,
  but the second operator is currently just ignored.

- If the user presses 1, plus, 2, equal, plus, equal. It should do 1 + 2 + 2.
  Currently operator followed by equal is ignored.

*/


var _numberElements = document.querySelectorAll(".number");
var _screenElement = document.querySelector(".screen");
var _clearButton = document.querySelector(".clear");
var _operatorButtons = document.querySelectorAll(".operator");
var _percentButton = document.querySelector(".percent");

// number on the screen
var _numberHolder = "";

// Holds all operations
var _stack = [];

// ----------------------------------------------------------------------------
// Event listeners

// Add event listeners for all number buttons
for (var i = 0; i < _numberElements.length; i++) {
    _numberElements[i].addEventListener("click", _numberButtonClicked);
}

// Add event listeners for all operand buttons
for (var i = 0; i < _operatorButtons.length; i++) {
    _operatorButtons[i].addEventListener("click", _operatorButtonClicked);
}

_clearButton.addEventListener("click", _clearButtonClicked);

_percentButton.addEventListener("click", _percentButtonClicked);



// ----------------------------------------------------------------------------
// Functions

/**
 * Helper function. Update the calculator screen.
 *
 * @param {string} _text String to update the calculator screen to.
 */
function _updateScreen(_text) {
    _screenElement.innerText = _text;
}


/**
 * Helper function. Based on "_operator" variable, the variables "_a" and "_b" will be calculated
 * and returned
 *
 * @param {float} _a left side of equation
 * @param {float} _b right side of equation
 * @param {string} _operator math operation
 */
function _calculate(_a, _b, _operator) {

    // Convert _a and _b to floats if they aren't already floats.
    // It's always good to do the conversion even if you expect them to be
    // floats.
    _a = parseFloat(_a);
    _b = parseFloat(_b);

    // Based on the operator, do the calculations.
    if (_operator == "plus") {
        return _a + _b;
    }

    if (_operator == "minus") {
        return _a - _b;
    }

    if (_operator == "times") {
        return _a * _b;
    }

    if (_operator == "divide") {
        return _a / _b;
    }
}



/**
 * Run when the user clicks on a number button.
 *
 * @param {MouseEvent} _event Mouse event
 */
function _numberButtonClicked(_event) {

    // Get the button the user clicks on.
    var _htmlElement = _event.target;

    // Get the inner text to use. This will be a string.
    var _value = _htmlElement.innerText;

    // Concatinate the _value with the previously stored _numberHolder.
    _numberHolder = _numberHolder + _value;

    // Update screen with new _numberHolder
    _updateScreen(_numberHolder);
}



/**
 * Run when the user clicks on an operator button.
 *
 * @param {MouseEvent} _event Mouse Event
 */
function _operatorButtonClicked(_event) {

    // Get the button the user clicks on.
    var _htmlElement = _event.target;

    // Get the inner text to use. This will be a string.
    var _htmlOperator = _htmlElement.value;

    // Convert the _numberHolder to a float.
    var _numberAsInt = parseFloat(_numberHolder);


    // If the previous step (parseFloat) returns a NaN (Not-A-Number), then
    // don't add it to the _stack.
    //
    // This is a weird way of writing this. It's because JavaScript doesn't have
    // a function to check to see if a variable is a Number
    if (isNaN(_numberAsInt) != true) {
        _stack.push(_numberAsInt);
    }

    // Clear the _numberHolder.
    _numberHolder = "";


    // If there is enough items in the stack, then let's calculate them and
    // replace them with the answer.
    if (_stack.length >= 3) {

        // Since our _stack is in reverse order of how the user wants the
        // calculation to happen, we need to store our variables in reverse
        // order.
        var _b = _stack.pop();
        var _operator = _stack.pop();
        var _a = _stack.pop();

        // Do the calculation and store it back on to the stack.
        var _answer = _calculate(_a, _b, _operator);
        _stack.push(_answer);

        // Update the screen with the answer
        _updateScreen(_answer);
    }

    // Get the last element in the stack
    var _last = _stack[_stack.length - 1];

    // If the operator isn't equal AND
    // the last element in the stack isn't a number THEN
    // push the operator to the stack.
    if ((_htmlOperator != "equals") && (!isNaN(_last))) {
        _stack.push(_htmlOperator);
    }
}



/**
 * Clear the stack, the number holder, and screen.
 */
function _clearButtonClicked() {
    // reset all numbers
    _stack = [];
    _numberHolder = "";

    // clear screen
    _updateScreen(0);
}

/**
 *
 */
function _percentButtonClicked() {

    var _numberAsInt = parseFloat(_numberHolder);

    if (isNaN(_numberAsInt)) {
        _numberAsInt = parseFloat(_stack[0]);
    }

    _numberHolder = _calculate(_numberAsInt, 100, "divide");

    _updateScreen(_numberHolder)

}
