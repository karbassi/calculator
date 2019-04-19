var numberElements = document.querySelectorAll(".number");
var screenElement = document.querySelector(".screen");

var number = "";

function numberClicked(event) {
    var htmlElement = event.target;
    var value = htmlElement.innerText;

    number = number + value;

    // Update screen
    screenElement.innerText = number;
}

for (var i = 0; i < numberElements.length; i++) {
    numberElements[i].addEventListener("click", numberClicked);
}
