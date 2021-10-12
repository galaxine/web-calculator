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