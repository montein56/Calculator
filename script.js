let first = "";
let second = "";
let operVar = "";

//CAPTURE KEYBOARD KEYS
function kbkey(kb){
    keyBtnPressed = kb.key;
    if (keyBtnPressed== 'Delete'){
        clearAll();
    } else enter(keyBtnPressed);
}

//RUN DISPLAY
function screen(result){
    if (result == '-' || result == '.' || result == '-.' || (result[result.length - 1] == ".")) {
        display.innerText = first;
    } else if (result.length > 14) {
        result = Math.round(result * 1000) / 1000;
        result = result.toExponential(3);
        display.innerText = result;
    } else {
        display.innerText = new Intl.NumberFormat().format(result);
        }
    }

//CALLED BY 'EQUAL' KEY, BY ENTER KEY & BY ANY OPERATOR KEY
// WHEN BOTH first & second VARIABLES ARE SET
function results(){
    switch (operVar) {
        case "+":
            first = parseFloat(first) + parseFloat(second);
            break;
        case "-":
            first = first - second;
            break;
        case "*":
            first = first * second;
            break;
        case "/":
            first = first / second;
            break;
    }
    second = "";
    operVar = "";
    screen (first);
}

//CLEAR EVERYTHING
function clearAll(){
    first = "";
    second = "";
    operVar = "";
    display.innerText = "";
    screen("");
}

function stage1 (keyBtnPressed){
    if(keyBtnPressed == "." || keyBtnPressed == "-"){ //capture ONLY initial -ve & decimals
        operVar = keyBtnPressed;
        screen(operVar);
    } else if (keyBtnPressed <= 9 && keyBtnPressed > 0){
        first = keyBtnPressed;
        screen(first);
    }
}

function stage2 (keyBtnPressed){
    if (keyBtnPressed == 'Backspace') {
        operVar = "";
        screen(operVar);
    } else if (keyBtnPressed <= 9){    //concatenate first digit entered after initial minus or decimal
        first = "" + operVar + keyBtnPressed;
        operVar = "";
        screen(first);
    } else if (keyBtnPressed == '.'){
        if (operVar == '.'){            //trap for more than one decimal
            operVar = '.';
        } else operVar = '-.';          //capture negative decimals
        screen(operVar);
    }
}

function stage3(keyBtnPressed){
    if (keyBtnPressed == 'Backspace') {
        first = first.toString().slice(0, -1);
    } else if (keyBtnPressed == '+' || keyBtnPressed == '-' || keyBtnPressed == '*' || keyBtnPressed == '/')  {
        operVar = keyBtnPressed;
    } else if (keyBtnPressed == '.'){
        if (first.includes('.')) {          //trap for more than one decimal
            first = first;
        } else {
            first = first + keyBtnPressed;
        }
    } else if (keyBtnPressed <= 9){
        first = "" + first + keyBtnPressed;
    }
    screen(first);
}

function stage4(keyBtnPressed){
    if (keyBtnPressed == 'Backspace') {
        operVar = "";
        screen(first);
    } else if (keyBtnPressed == ('+') || keyBtnPressed == ('-') || keyBtnPressed == ('*') || keyBtnPressed == ('/')) {
        operVar = keyBtnPressed;        //simply replace the operator with the new one
        screen(first);
    } else if (keyBtnPressed == 0 && operVar == '/') {    //check divide by zero
        alert("!!!! CAN'T DIVIDE BY ZERO !!!!");
    } else if (keyBtnPressed != 0 && keyBtnPressed != '=') {    //this fills 'second' with a digit 1 to 9
        second = "" + keyBtnPressed;
        screen(second);
    }
}

function stage5(keyBtnPressed){
    if (keyBtnPressed == 'Backspace') {
        second = second.toString().slice(0, -1);
        screen(second);
    } else if (keyBtnPressed == '+' || keyBtnPressed == '-' || keyBtnPressed == '*' || keyBtnPressed == '/') {
        results();
        operVar = keyBtnPressed;
    } else if (keyBtnPressed == '='|| keyBtnPressed == 'Enter'){ //allow for number keypad = and 'Enter' keys
        results();
    } else if (keyBtnPressed == '.'){
        if (second.includes('.')) {   //trap for more than one decimal
            second = second;
        } else {
            second = "" + second + keyBtnPressed;
        }
        screen(second);
    } else if (keyBtnPressed <= 9){
        second = "" + second + keyBtnPressed;
        screen(second);
    }
}

//MAIN FUNCTION
function enter(keyBtnPressed){
    if(first == "" && second == "" && operVar == ""){   //STAGE1: BLANK
        stage1(keyBtnPressed);
    } else if(first=="" && operVar != ""){              //STAGE2: only operVar full
        stage2(keyBtnPressed);
    } else if(first != "" && operVar == "") {           //STAGE3: Only first full, capture operator
        stage3(keyBtnPressed);
    } else if (first != "" && operVar != "" && second == "") {  // STAGE 4: Only 2nd MT
        stage4(keyBtnPressed);
    } else if (first != "" && operVar != "" && second != ""){   // STAGE 5: All Three full
        stage5(keyBtnPressed);
    }
}

const display = document.getElementById("display");
display.innerText = "";

document.addEventListener('keydown', kbkey);