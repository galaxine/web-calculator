/*
1.I want to evaluate several inputs
    Maybe push them into an array.
2. adding
3. subtracting
4. multiplying
5. dividing
a+b = c
a = c
a+b = c
*/
let entries = [];
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
    return operate(a, b);
}

function assigner(params) {
    if (typeof a == "undefined") {
        a = params;
    } else {}
}
const textArea = document.querySelector(".textArea");
const calcBody = document.querySelector(".calculator");
let thing;
/**
 *
 * @param event calls the functions and assigns the values according to the buttons pressed
 */
calcBody.addEventListener("onclick", assign);

function assign(event) {
    let target = event.target;
    thing = target.textContent;
    console.log(thing);
    switch (thing) {
        case "1":
            entries.push(1);
            break;
        case "2":
            entries.push(2);
            break;
        case "3":
            entries.push(3);
            break;
        case "4":
            entries.push(4);
            break;
        case "5":
            entries.push(5);
            break;
        case "6":
            entries.push(6);
            break;
        case "7":
            entries.push(7);
            break;
        case "8":
            entries.push(8);
            break;
        case "9":
            entries.push(9);
            break;
        case "0":
            entries.push(0);
            break;
        case "power":
            entries.push("power");
            break;
        case "sqrt":
            entries.push("sqrt");
            break;
        case "lg":
            entries.push("lg");
            break;
        case "ln":
            entries.push("ln");
            break;
        case "(":
            entries.push("(");
            break;
        case ")":
            entries.push(")");
            break;
        case "AC":
            entries.push("AC");
            break;
        case "Del":
            entries.push("Del");
            break;
        case "%":
            entries.push("%");
        case "÷":
            entries.push("/");
            break;
        case "X!":
            entries.push("x!");
            break;
        case "×":
            entries.push("mult");
            break;
        case "1/x":
            entries.push("float");
            break;
        case "−":
            entries.push("subtr");
            break;
        case "π":
            entries.push("pi");
            break;
        case "+":
            entries;
            break;
        case "list":
            console.log("show list");
            break;
        case "ₑ":
            console.log("euler");
            break;
        case "⋅":
            console.log("dot");
            break;
        case "=":
            console.log("equals");
            break;
        default:
            console.log("should not happen");
            break;
    }
}