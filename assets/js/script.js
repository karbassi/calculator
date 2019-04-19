var numberElements = document.querySelectorAll(".number");
var screenElement = document.querySelector(".screen");
var clearButton = document.querySelector(".clear");
var addButton = document.querySelector(".plus");
var equalButton = document.querySelector(".equal");

// number on the screen
var number = "";

// variables to hold our equation
var memory1 = null;
var memory2 = null;
var action = null;


// Update screen
function updateScreen(number) {
    screenElement.innerHTML = number;
}


// Number clicked
function numberClicked(event) {
    var htmlElement = event.target;
    var value = htmlElement.innerText;

    number = number + value;

    // Update screen
    updateScreen(number);
}

// Add event listeners for all the number buttons
for (var i = 0; i < numberElements.length; i++) {
    numberElements[i].addEventListener("click", numberClicked);
}



// Clear button
function reset(event) {
    // reset all numbers
    number = "";
    memory1 = null;
    memory2 = null;


    // clear screen
    updateScreen(0);
}

clearButton.addEventListener("click", reset);


// Add button
function addButtonClicked(event) {
    console.log("addButtonClicked", memory1, memory2);

    // Save action
    action = "+";

    if (memory1 == null) {
        memory1 = parseInt(number, 10);
    } else {
        memory2 = parseInt(number, 10);
    }

    // clear number-holder
    number = "";

    // if both memory slots are set, then do the math
    if ((memory1 != null) && (memory2 != null)) {

        // do the math and save it to memory1 slot
        memory1 = memory1 + memory2;

        // Update screen with the answer/memory1 slot
        updateScreen(memory1);
    }
}

addButton.addEventListener("click", addButtonClicked);

// Equal button
function equalButtonClicked(event) {
    console.log("equalButtonClicked", memory1, memory2);

    // if memory1 isn't set, there is no point in doing anything, so just quit
    if (memory1 == null) {
        return;
    }

    // set the last number from the screen to memory2
    memory2 = parseInt(number, 10);

    if (action == "+") {
        console.log("equalButtonClicked", memory1, memory2, action);

        // do the math and save it to memory1 slot
        memory1 = memory1 + memory2;

        // Update screen with the answer/memory1 slot
        updateScreen(memory1);
    }
}

equalButton.addEventListener("click", equalButtonClicked);
