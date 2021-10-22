/*
String taken, joined by one each time
*/
let numberString = [];
let pressedFunctions = undefined;
let a = undefined;
let b = undefined;
let c = undefined;
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operator(a, b, operate) {
    switch (operate) {
        case "+":
            return add(a, b);
        case "x":
            return multiply(a, b);
        case "-":
            return subtract(a, b);
        case "/":
            return divide(a, b);
        default:
            console.log("Something is wrong");
            break;
    }
}
/*the user enters the numbers,
 * while functions aren't pressed, every number and dot function is valid.
 * ideally:1.press a number, join it to the screen and the array as a string until
 *         an operator is pressed, then the string array is converted into a number and assigned to a.
 *
 *         2.the Array is being emptied, there is a value that takes the function. pressedFunctions is true. Also remove the textArea
 *
 *         3.Since pressedFunctions is true and the variable a is established, we can intermittently do something:
 *            we can change the operators:
 *              * dividing
 *              * multiplication
 *              * add/subtract
 *              * actually delete every variable
 *              * use % to divide the number by 100, show the same in the area and
 *                assign i>t to a.
 *                  * remove the assigned function so it can be reassigned for later
 *                    go back to 1
 *              * we can press AC, All clear to clear everything and start anew
 *            if we change the operators, we need to keep the pressedFunctions still running,
 *            because assigner is dependent on it to fill either a or b later.
 *          4.These options are saved into a string called pressedFunction
 *            After that, we need to assign the numbers to b, unless % is pressed:
 *              see 3. % part.
 *
 */
const textArea = document.querySelector("textarea");
const calcBody = document.querySelector(".calc-buttons");
textArea.textContent = "0";
numberString.push("0");
let thing;
/**
 *
 * @param event calls the functions and assigns the values according to the buttons pressed
 */
//this doesn't work at ALL. why?
//calcBody.addEventListener("onclick", assign);
//assign it was called.
/**
 * Just an event delegation to catch all the buttons.
 * @param event assign the button clicks to the array for further evaluation
 */
calcBody.onclick = function (event) {
    let target = event.target;
    thing = target.textContent;
    switch (thing) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": // check if a is undefined, if it is, then first assign the number to the textArea, then push it to the array, parse the array into a number and assig it to a
            if (typeof a == "undefined" && typeof c == "undefined") {
                textArea.textContent = thing;
                numberString.push(thing);
                a = parseInt(numberString.join(""));
                numberString = a.toString().split("");
            }
            else if (typeof a != "undefined" &&
                typeof b == "undefined" &&
                typeof pressedFunctions == "undefined") {
                // a is defined, but the function button hasn't been pressed yet. Continue to add to a
                numberString.push(thing);
                a = parseInt(numberString.join(""));
                numberString = a.toString().split("");
                textArea.textContent = a;
            }
            else if (typeof a != "undefined" &&
                typeof pressedFunctions != "undefined") {
                // a is defined, and the function button has been pressed. Continue to add to b
                numberString.push(thing);
                b = parseInt(numberString.join(""));
                numberString = b.toString().split("");
                textArea.textContent = b;
            }
            else if (
            // this should happen after the equals button is pressed and no other function is pressed after that. I want it to be added to a and
            typeof c != "undefined" &&
                typeof pressedFunctions == "undefined") {
                textArea.textContent = thing;
                numberString.push(thing);
                a = parseInt(numberString.join(""));
            }
            break;
        case "0":
            /*
             * if the user enters zero, then we will check if the first index is already zero, if it is, then we add nothing.
             * if it is not, then we add zero to the textArea and push it to the array.
             */
            if (thing == numberString[0]) {
            }
            else {
                textArea.textContent += thing;
                numberString.push(thing);
            }
            break;
        case "AC":
            a = undefined;
            b = undefined;
            c = undefined;
            numberString = [];
            textArea.textContent = "0";
        case "Del":
            if (typeof a != "undefined" && typeof b == "undefined") {
                numberString.pop();
                a = parseInt(numberString.join(""));
                textArea.textContent = a.toString();
            }
            else if (typeof a != "undefined" && typeof b != "undefined") {
                numberString.pop();
                b = parseInt(numberString.join(""));
                textArea.textContent = b.toString();
            }
            break;
        case "+":
        case "x":
        case "/":
        case "-":
            // a must be defined before we can press any of these buttons.
            // when it is pressed, the textArea is emptied, and the array is emptied.
            if (typeof pressedFunctions == "undefined") {
                pressedFunctions = thing;
                numberString = [];
                numberString.push("0");
                textArea.textContent = "0";
                b = 0;
            }
            break;
        case "=":
            if (typeof a != "undefined" &&
                typeof b != "undefined" &&
                typeof pressedFunctions != "undefined") {
                // a and b are defined, and the function button has been pressed.
                // we can now do the calculation
                c = operator(a, b, pressedFunctions);
                textArea.textContent = c.toString();
                numberString = c.toString().split("");
                a = undefined;
                b = undefined;
                pressedFunctions = undefined;
                numberString = [];
            }
            break;
        case "%":
            if (typeof a != "undefined" && typeof b == "undefined") {
                a /= 100;
                textArea.textContent = a.toString();
                numberString = a.toString().split("");
            }
            else if (typeof b != "undefined") {
                b /= 100;
                textArea.textContent = b.toString();
                numberString = b.toString().split("");
            }
            break;
        default:
            console.log("something is wrong");
            break;
    }
};
