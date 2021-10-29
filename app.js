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
 *  TODO: 
 * *6RS. the user can decide between an additional number added to the right side or pressing the equals button or the operator buttons.
 *  *7RS. if the user presses the equals button, then the calculator will perform the operation starting from 3LSRS or 4RS.
 *    *the LS,RS and operator will be assigned to a function to process the calculation, then assigned to the left side.
 *      *If the user enters another number and has no operator, then this is a new calculation.
 *      *if the user enters an oeprator first, the calculation will be continued.
 *  *8RS. if the user presses the operator button, and the calculator has already a calculation memorized, then the calculator will perform the calculation in memory
 *   *and the new operation will be assigned to the left side. The right side will be assigned to undefined (needs to be assigned a new number)
 *   *and the operator has to be assigned again.
 * 
 * 
 */


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
calcBody.onclick = function(event) {
    let target = event.target;
    let content = target.textContent;
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
            break;
        case ".":
            break;
        case "AC":
            break;
        case "Del":
            break;
        case "+":
        case "x":
        case "/":
        case "-":
            break;
        case "=":
            break;
        case "%":

            break;
        default:
            console.log("something is wrong");
            break;
    }
};