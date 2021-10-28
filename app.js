/*
String taken, joined by one each time
*/
let numberString = [];
let pressedFunc = undefined;
let reserveFunc = "";
let a = undefined;
let b = undefined;
let c = undefined;
let equalsPressed = true;
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
 *         2.the Array is being emptied, there is a value that takes the function. pressedFunc is true. Also remove the textArea
 *
 *         3.Since pressedFunc is true and the variable a is established, we can intermittently do something:
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
 *            if we change the operators, we need to keep the pressedFunc still running,
 *            because assigner is dependent on it to fill either a or b later.
 *          4.These options are saved into a string called pressedFunction
 *            After that, we need to assign the numbers to b, unless % is pressed:
 *              see 3. % part.
 *
 */
const textArea = document.querySelector("textarea");
const calcBody = document.querySelector(".calc-buttons");
textArea.textContent = "0";
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
            /*
            [
              1.it's 0 at the start:
                [
                  pressedFunction is "", equals is false
                ]
              2. we press a number:
                [
                  pressedFunction is "", equals is false
                ],
                [
                  1.numberString.push(a);
                  2.a = parseFloat(numberString.push(a).join(""))
                  3.textArea = a;
                ]
              3. either press a number (2.) or press a function.
              3.1. pressed number.
                [
                  pressedfunction is "", equals is false
                ],
                [
                  see (2.)
                ]
              3.2 pressed a Function, again and again:
                [
                  pressedFunction "function", equals is false, b is undefined
                ],
                [
                  1.assign pressedFunction with content.
                  2.empty numberString
                  3.add 0 to textArea, b undefined is like 0.
                ],
                [
                  pressedFunction "function", equals is false, b is undefined
                ]
              4. we press a number:
                [
                  pressedFunction is "function", equals is false, b is undefined
                ],
                [
                  1. numberString.push(content)
                  2. b = parseFloat(numberString.join(""));
                  3. textArea = b;
                ],
                [
                  pressedfunction "function", equals false, b defined
                ]
              5. We either press the function, number or equals:
              5.1 we press either function or number:
                [
                  pressedFunction "function", equals is false, b defined
                ],
                [
                  so we did this: 1 + 1 but I want to do 1 + 1 + 1, what am I doing then after the first number is established?
                  [
                  1. press the function button
                    [
                     pressedFunction "function", equals is false, b is defined, content is ""
                    ],
                    [
                      1. we press the function button -> check for reserve = ""
                      2. reserve = content;
                      2. a = operator(a,b,function);
                      3. numberString = [];
                      4. b is undefined
                      5. textArea = a;
                      6. pressedFunction = reserve
                      7.reserve = ""
      
                    ],
                    [
                      pressedFunction "function", equals is false, b is undefined
                    ]
                  2. press a number
                    [
                      [function button is pressed, but not equals]
                    ],
                    [
                      add number into string
                      add number into b
                      add b into textArea.textContent
                    ],
      
                  3. repeat 1. or 2.
                    [ EDIT:  the problem here is that one and two has the same condition
                      1. we pressedFunction button.
                        [
                          [the function button is already pressed, ready to spring into action, equals is not pressed]
                        ],
                        [
                          1. first let the calculator know that the user pressed the func buttons and has full func, put the new calc into reserveFunc
                            [
                              pressedFunction = +
                              reserveFunc= content
                            ]
                            2. a = operator(a,b,operator)
                            3. b = undefined
                            4. numberString = []
                            5. textArea filled with result a
                            6. func is replaced with the reserveFunc
                            [
                              pressedFunction = reserveFunc
                              reserveFunc = ""
                            ]
                        ]
                      2. we pressed a number
                        [
                          [pressedFunction is already pressed, ready to spring into action, equals is not pressed]
                        ],
                        [
      
                        ]
                    ]
                  ]
                ]
              ]
                 
                5.2 press the equals button / press del / press AC
                
              
              
            
            else if the function
            = ?????? What happens after the equals button is pressed?
            Either:
              if numbers are pressed, then the previous calculation has been discarded.
              if the latter calculation has been discarded, then we start a new calculation.
                if the functionbutton is not pressed and the equalsButton is not pressed, then we repeat the original steps starting with zero, but this time with the new number.
            Or:
              if the functionbutton is pressed, then the previous calculation is being further utilized.
              if it is utilized, and the function button is pressed and the equalsbutton is not pressed, hen we add digits to b continuously.
               
            */
            // so it shouldn't matter if the textArea is zero or not, but rather if the pressedFunction is pressed, is undefined and equalsPressed
            if ((pressedFunc == "" || pressedFunc != "") && !equalsPressed) {
                // supposed to fill a
                numberString.push(content);
                a = parseFloat(numberString.join(""));
                textArea.textContent = a;
            }
            else if (pressedFunc !== "" && !equalsPressed) {
                numberString.push(content);
                b = numberString.join;
            }
            break;
        case ".":
            // if there is no dot, then assign it either to a, or to b. depending on the pressedFunc value.
            if (!textArea.textContent.includes(".")) {
                numberString.push(content);
                textArea.textContent = numberString.join("");
                if (typeof pressedFunc != "undefined") {
                    b = parseInt(numberString.join(""));
                }
                else {
                    a = parseInt(numberString.join(""));
                }
            }
            break;
        case "AC":
            a = undefined;
            b = undefined;
            c = undefined;
            numberString = [];
            textArea.textContent = "0";
            equalsPressed = false;
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
            // we need to know if
            if (typeof a !== "undefined" && pressedFunc == "") {
                numberString = [];
                b = 0;
                textArea.textContent = b;
                pressedFunc = content;
            }
            else if (typeof b == "number" && pressedFunc !== "") {
                numberString = [];
                reserveFunc = content;
                a = operator(a, b, content);
                b = 0;
                textArea.textContent = a;
                pressedFunc = reserveFunc;
                reserveFunc = "";
            }
            break;
        case "=":
            /*      if (
              typeof a != "undefined" &&
              typeof b != "undefined" &&
              typeof pressedFunc != "undefined"
            ) {
              // a and b are defined, and the function button has been pressed.
              // we can now do the calculation
              c = operator(a, b, pressedFunc);
              textArea.textContent = c.toString();
              numberString = c.toString().split("");
              a = undefined;
              b = undefined;
              pressedFunc = undefined;
              numberString = [];
              equalsPressed = true;
            }*/
            equalsPressed = true;
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
