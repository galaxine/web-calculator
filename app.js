let leftside = undefined;
let rightside = undefined;
let offhand = undefined;
let firstFunc = "";
let secFunc = "";
let digits = [];

function debugCalc() {
    console.log("leftside: " + leftside);
    console.log("rightside: " + rightside);
    console.log("firstFunc: " + firstFunc);
    console.log("secFunc: " + secFunc);
    console.log("digits: " + digits);
    console.log("offhand: " + offhand);
    console.log();
}
const textArea = document.querySelector(".textarea");
const calcBody = document.querySelector(".calc-buttons");
textArea.textContent = "0";

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

function round(num) { // * maximum three digits after the decimal point
    let result = num.toString().split("");
    let dot = result.indexOf(".");

    if (result.some(x => x === ".")) {
        if (result.length - dot > 4) {
            result.splice(dot + 5, result.length - dot);
        }
    }
    return parseFloat(result.join(""));
}
// on click
function logic(event) {
    let target;
    let content;

    if (event instanceof PointerEvent) {
        target = event.target;
        content = target.textContent;
    } else {
        content = event.key;
    }
    switch (content) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            if (firstFunc === "") { //step one and two
                console.log("step 1 and step 2")
                digits.push(content);
                leftside = parseFloat(digits.join(""));
                textArea.textContent = leftside;
            } else if (
                leftside !== undefined &&
                rightside === undefined &&
                firstFunc !== "" &&
                secFunc === ""
            ) {
                console.log("step 5")
                digits = [];
                digits.push(content);
                rightside = parseFloat(digits.join(""));
                textArea.textContent = rightside;
                let button = document.querySelector(".less-orange");
                button.classList.remove("less-orange");
                button.classList.add("orange");
            } else if (
                leftside !== undefined &&
                rightside !== undefined &&
                firstFunc !== "" &&
                secFunc === ""
            ) {
                console.log("step 6")
                digits.push(content);
                rightside = parseFloat(digits.join(""));
                textArea.textContent = rightside;
            } else if ( // ? Something wrong here.
                leftside !== undefined &&
                rightside === undefined &&
                firstFunc !== "" &&
                secFunc !== "" &&
                offhand == undefined
            ) {
                console.log("step 9");
                digits.push(content);
                rightside = parseFloat(digits.join(""));
                textArea.textContent = rightside;
                secFunc = "";
                let button = document.querySelector(".less-orange");
                button.classList.remove("less-orange");
                button.classList.add("orange");
            } else if (
                leftside !== undefined &&
                rightside === undefined &&
                firstFunc !== "" &&
                secFunc !== "" &&
                offhand !== undefined
            ) {
                digits.push(content);
                rightside = parseFloat(digits.join(""));
                textArea.textContent = rightside;
                secFunc = "";
                console.log("you entered the last if condition");
                let button = document.querySelector(".less-orange");
                button.classList.remove("less-orange");
                button.classList.add("orange");
            }
            changeGrey(target, content);
            break;
        case ".":
            /*.=> 0.3 */
            if (!digits.some(x => x === ".")) {
                digits.push(content);
                if (digits.length === 1 && digits[0] == ".") {
                    digits = [];
                    digits.push("0");
                    digits.push(content);
                    if (leftside == undefined) {
                        leftside = parseFloat(digits.join(""));
                        textArea.textContent = leftside;
                    } else {
                        rightside = parseFloat(digits.join(""));
                        textArea.textContent = rightside;
                    }
                } else if (leftside === undefined && rightside === undefined) {
                    textArea.textContent = digits.join("");
                    leftside = parseFloat(digits.join(""));
                } else {
                    textArea.textContent = digits.join("");
                    rightside = parseFloat(digits.join(""));
                }
                changeGrey(target, content);
            }
            break;
        case "Del":
        case "Backspace":
            if (leftside === parseInt(textArea.textContent)) {
                digits.pop();
                leftside = parseFloat(digits.join(""));
                if (typeof(leftside) == "NaN") {
                    textArea.textContent = "0";
                }
                textArea.textContent = leftside;
            } else if (rightside === parseInt(textArea.textContent)) {
                digits.pop();
                if (typeof(rightside) == "NaN") {
                    textArea.textContent = "0";
                }
                rightside = parseFloat(digits.join(""));
                textArea.textContent = rightside;
            }
            changeRed(target);
            break;
        case "+":
        case "x":
        case "*":
        case "/":
        case "-":
            if (content === "*") {
                content = "x";
            }
            if (leftside !== undefined &&
                rightside === undefined &&
                firstFunc === "" &&
                secFunc === ""
            ) {
                console.log("step 3");
                firstFunc = content;

            } else if (leftside !== undefined &&
                rightside === undefined &&
                firstFunc !== "" &&
                secFunc === "") {
                console.log("step 4");
                firstFunc = content;
            } else if (
                leftside !== undefined &&
                rightside !== undefined &&
                firstFunc !== "" &&
                secFunc === ""
            ) { //? What if the user enters an operator that precedes the first one?
                console.log("step 7");
                digits = [];
                secFunc = content;
                if ((secFunc === "x" || secFunc === "/") && (firstFunc === "+" || firstFunc === "-")) { // ! check if this works correctly
                    offhand = leftside.toString() + firstFunc;
                    leftside = rightside;
                    rightside = undefined;
                    firstFunc = secFunc;
                } else { // * we can calculate the result for leftside because the used operator is +|-
                    leftside = operator(leftside, rightside, firstFunc);
                    firstFunc = secFunc;
                    rightside = undefined;
                    textArea.textContent = round(leftside);
                }
            } else if (leftside !== undefined &&
                rightside === undefined &&
                firstFunc !== "" &&
                secFunc !== ""
            ) { //? What if the user enters an operator that precedes others? and what if the user wants to go back to a plus/minus?
                console.log("step 8");
                if (content === "+" || content === "-") { //! not that sure. I wanted to reverse the operations. I have decided that, if the user reverts from 
                    rightside = leftside;
                    let dummy = offhand.split("");
                    leftside = parseFloat(dummy.slice(0, length - 1).join(""));
                    firstFunc = dummy.slice(dummy.length - 1).join("");
                    leftside = operator(leftside, rightside, firstFunc);
                    firstFunc = content;
                    rightside = undefined;
                    textArea.textContent = round(leftside);
                }
                firstFunc = content;
            } else if (
                leftside === undefined &&
                rightside === undefined &&
                firstFunc === "" &&
                secFunc === ""
            ) {
                leftside = parseFloat(textArea.textContent);
                firstFunc = content;
            } else if (
                leftside !== undefined &&
                rightside !== undefined &&
                firstFunc === "" &&
                secFunc === ""
            ) {
                firstFunc = content;
            }
            changeOrange(target, content);
            break;
        case "=":
        case "Enter":
            if (leftside === undefined) {
                console.log("leftside undefined equals zero");
                textArea.textContent = "Do you want the world to end?!";
            } else if (
                leftside !== undefined && rightside === undefined
            ) {
                if (offhand !== undefined) {
                    digits = [];
                    digits.push(offhand.split(""));
                    rightside = operator(leftside, rightside, firstFunc);
                }
                console.log("");
                textArea.textContent = "STILL trying to destroy the world?";
            } else if (
                leftside !== undefined && rightside !== undefined && offhand !== undefined
            ) {
                let newResult = operator(leftside, rightside, firstFunc);
                if (newResult == "Infinity") {
                    textArea.textContent = "ARE YOU TRYING TO DO THE IMPOSSIBLE?!!!";
                } else {
                    let dummy = offhand.split("");
                    leftside = parseFloat(dummy.slice(0, length - 1).join(""));
                    firstFunc = dummy.slice(dummy.length - 1).join("");
                    leftside = operator(leftside, newResult, firstFunc);
                    textArea.textContent = round(leftside);
                }
            } else if (
                leftside !== undefined && rightside !== undefined
            ) {
                let result = `${round(operator(leftside, rightside, firstFunc))}`;
                if (result == "Infinity") {
                    textArea.textContent = "SOMEONE STOP THIS MADMAN!";
                } else {
                    textArea.textContent = `${round(operator(leftside, rightside, firstFunc))}`;
                }
                leftside = undefined;
                rightside = undefined;
                digits = [];
                firstFunc = "";
                secFunc = "";
            }
            setTimeout(() => {
                changeOrange(target, content);
            }, 125);
            defaulting();
            break;
        case "%":
            if (leftside === undefined && textArea.textContent == "0") {
                leftside = 0;
                textArea.textContent = "0";
            } else if (leftside === parseFloat(textArea.textContent)) {
                leftside = leftside / 100;
                digits = leftside.toString().split("");
                textArea.textContent = leftside;
            } else {
                rightside = rightside / 100;
                digits = rightside.toString().split("");
                textArea.textContent = rightside;
            }
            changeOrange(target, content);
            break;
        case "AC":
        case "Escape":
            resetValues();
            textArea.textContent = "0";
            changeRed(target);
            setTimeout(() => defaulting(), 1200)
            break;
        case "git":
        case "g":
            window.open("https://github.com/galaxine", "_blank");
        default:
            console.log(event.key);
            break;
    }
}


calcBody.onclick = logic;

window.onkeydown = logic;

function changeGrey(target, content) {
    target.classList.remove("grey");
    target.classList.add("less-grey");
    if (content !== ".") {
        setTimeout(() => {
            target.classList.remove("less-grey");
            target.classList.add("grey");
        }, 125)
    }
}
/**
 * Changes the buttons from orange to another one the moment the player presses it.
 * The class is changed from orange to less-orange.
 * % is a quick calc button as it is immediately applied.
 * the rest of the orange buttons, except maybe the "=" button, are not changing unless another operator button is pressed. 
 * @param {the current button caught by the clickEvent} target 
 * @param {the content inside the button} content 
 */
function changeOrange(target, content) {
    target.classList.remove("orange");
    target.classList.add("less-orange");
    if (content == "%") {
        setTimeout(() => {
            target.classList.remove("less-orange");
            target.classList.add("orange")
        }, 250);
    } // * here we check later if any classes that are equal to "content". If they aren't, then we change those to orange.
    let buttons = document.querySelectorAll(".less-orange"); // * first of all, get all the less-orange classed buttons.
    buttons.forEach(button => {
        if (button.textContent !== content) {
            if (content == "%") {} else {
                button.classList.remove("less-orange");
                button.classList.add("orange");
            }
        }
    });
}

function changeRed(target) {
    target.classList.remove("red");
    target.classList.add("less-red");
    setTimeout(() => {
        target.classList.remove("less-red");
        target.classList.add("red");
    }, 125)
}

function defaulting() {
    let buttons = document.querySelectorAll("button");
    buttons.forEach(element => {
        if (element.className == "less-black" || element.className == "black") {
            element.classList.replace("less-black", "black");
        } else if (element.className == "less-orange" || element.className == "orange") {
            element.classList.replace("less-orange", "orange");
        } else if (element.className == "less-red" || element.className == "red") {
            element.classList.replace("less-red", "red");
        } else if (element.className = "less-grey" || element.className == "grey") {
            element.classList.replace("less-grey", "grey");
        }
    });
}

function resetValues() {
    leftside = undefined;
    rightside = undefined;
    firstFunc = "";
    secFunc = "";
    offhand = undefined;
    digits = [];
}