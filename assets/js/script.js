var numberElements = document.querySelectorAll(".number");
var screenElement = document.querySelector(".screen");
var clearButton = document.querySelector(".clear");

var number = "";

// Number clicked
function numberClicked(event) {
    var htmlElement = event.target;
    var value = htmlElement.innerText;

    number = number + value;

    // Update screen
    screenElement.innerText = number;
}

// Add event listeners for all the number buttons
for (var i = 0; i < numberElements.length; i++) {
    numberElements[i].addEventListener("click", numberClicked);
}



// Clear button
function reset(event) {
    // set number to empty
    number = "";

    // clear screen
    screenElement.innerText = "0";
}

clearButton.addEventListener("click", reset);
