/**
 * Calculator:
 * When the user starts, he/she will see a calculator with a display showing 0.
 * The user can enter numbers and operators.
 * The calculator will perform the operation and display the result.
 * Sometimes, the user wants to perform an operation on the previous result or operation.
 * 
 * What are the steps?
 * *1LS. the user enteres a number for the left side.
 * TODO: The user presses a button, the number is a string and pushed to an array.
 * TODO: The array should be changed into a number and assigned to the leftside.
 * TODO: The leftside should be displayed on the calculator.
 * ! the user pBBressed the operator function
 * ! the leftside is undefined, the pressedFunc isn't   
 * ? But what if the user presses the operator function anyways? We have an inherent zero in the calculator.
 * ? Shouldn't we then take that as a leftside and continue?
 * *2LS. the user can enter another number to the left side as long as the user does not use an operator.
 * TODO: The user can add more number to the leftside until an operator is pressed and assigned 
 * TODO: to the 1st memory.
 * *3LSRS. if the user enters an operator, the calculator will memorize it and start to take numbers from the right side.
 * TODO: The user presses +/-x and it is assigned to the 1st memory. Leftside is locked out. 
 * TODO: the calculator shows a zero
 * *4RS. if the user has not entered a number yet but pressed another operator, the calculator will change the operation and get back to anticipating numbers for the right side.
 * TODO: The user didn't assign a number to the rightside yet. It is staying undefined
 * TODO: Because of it, if the user presses +/-x it is assigned to the 1st memory replacing it, the rightside stays unchangedly undefined.
 * *5RS. if the user entered a number, then it is assigned to the right side.
 *  !The operators can not be changed anymore, unless the user uses AC, which discards the whole operation or it presses enter.
 *  TODO: The user pressed a number and it was assigned to the rightside. 
 *  TODO: 1st function is in memory, leftside is locked out.
 * *6RS. the user can decide between an additional number added to the right side or pressing the equals button or the operator buttons.
 *  *7RS. if the user presses the equals button, then the calculator will perform the operation starting from 3LSRS or 4RS.
 *    *the LS,RS and operator will be assigned to a function to process the calculation, then assigned to the left side.
 * TODO: The user pressed equals, the left and right side are defined by now and the 1st operation usable
 * TODO: the oepration is being calculated and then assigned to leftside and then displayed.
 * TODO: remove the leftside from memory, turn it undefined.
 *      *If the user enters another number and has no operator, then this is a new calculation.
 *      TODO: user enters a number, check if the leftside is undefined, if it is, then a new number is assigned to the leftside.
 *      *if the user enters an oeprator first, the calculation will be continued.
 *      TODO: user enters an operator, it wants to continue from there.
 *      TODO: the leftside was undefined, so did the right side was undefined, now the 1st function is defined.
 *  *8RS. if the user presses the operator button, and the calculator has already a calculation memorized, then the calculator will perform the calculation in memory
 *   *and the new operation will be assigned to the left side. The right side will be assigned to undefined (needs to be assigned a new number)
 *   *and the operator has to be assigned again.
 *  
 * 
 */
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
const textArea = document.querySelector("textarea");
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
    let clickTarget;
    let content;

    if (event instanceof PointerEvent) {
        clickTarget = event.target;
        content = clickTarget.textContent;
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
                debugCalc();
                console.log("you entered the last if condition")
            }
            debugCalc();
            break;
        case ".":
            if (!digits.some(x => x === ".")) {
                digits.push(content);
                if (leftside !== undefined && rightside === undefined) {
                    textArea.textContent = digits.join("");
                    leftside = parseFloat(digits.join(""));
                } else {
                    textArea.textContent = digits.join("");
                    rightside = parseFloat(digits.join(""));
                }
            }
            break;
        case "Del":
        case "Backspace":
            if (leftside === parseInt(textArea.textContent)) {
                digits.pop();
                leftside = parseFloat(digits.join(""));
                textArea.textContent = leftside;
            } else if (rightside === parseInt(textArea.textContent)) {
                digits.pop();
                rightside = parseFloat(digits.join(""));
                textArea.textContent = rightside;
            }
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
            }
            debugCalc();
            break;
        case "=":
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
                let dummy = offhand.split("");
                leftside = parseFloat(dummy.slice(0, length - 1).join(""));
                firstFunc = dummy.slice(dummy.length - 1).join("");
                leftside = operator(leftside, newResult, firstFunc);
                textArea.textContent = round(leftside);
            } else if (
                leftside !== undefined && rightside !== undefined
            ) {
                textArea.textContent = `${round(operator(leftside, rightside, firstFunc))}`;
                leftside = undefined;
                rightside = undefined;
                digits = [];
                firstFunc = "";
                secFunc = "";
            }
            break;
        case "%":
            if (leftside === parseFloat(textArea.textContent)) {
                leftside = leftside / 100;
                digits = leftside.toString().split("");
                textArea.textContent = leftside;
            } else {
                rightside = rightside / 100;
                digits = rightside.toString().split("");
                textArea.textContent = rightside;
            }
            break;
        case "AC":
        case "Escape":
            resetValues();
            textArea.textContent = "0";
            debugCalc();
            break;
        default:
            console.log(event.key);
            break;
    }
}

calcBody.onclick = logic;

window.onkeydown = logic;


function resetValues() {
    leftside = undefined;
    rightside = undefined;
    firstFunc = "";
    secFunc = "";
    offhand = undefined;
    digits = [];

}