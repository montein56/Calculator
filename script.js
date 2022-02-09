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
    if (result == '-' || result == '.' || result == '-.' || (result[result.length - 1] == ".")) { //last one: to allow '9.'
        display.innerText = result;
    } else if (result < 0){
        display.innerText = result;
    
    } else if (result.length > 12) {
        result = parseFloat(result).toExponential(3);
        display.innerText = result;
    } else {
        result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        display.innerText = result;
        }
    }

//DISPLAY KEYS PRESSED & RESULTS OF OPERATIONS
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
    first = Math.round(first * 1000) / 1000;
    first = first.toString();
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

//STAGE 1: ALL 3 BLANK
function stage1 (keyBtnPressed){
    if(keyBtnPressed == "." || keyBtnPressed == "-"){ //capture ONLY initial -ve & decimals
        operVar = keyBtnPressed;
        screen(operVar);
    } else if (keyBtnPressed <= 9 && keyBtnPressed > 0){
        first = keyBtnPressed;
        screen(first);
    }
}
//STAGE2: only operVar full
function stage2 (keyBtnPressed){
    if (keyBtnPressed == 'Backspace') {
        operVar = "";
        screen(operVar);
    } else if (keyBtnPressed <= 9){    //concatenate digit entered after initial minus or decimal
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
//STAGE3: Only first full, capture operator
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
// STAGE 4: Only 2nd MT
function stage4(keyBtnPressed){
    if (keyBtnPressed == 'Backspace') {
        operVar = "";
        screen(first);
    } else if (keyBtnPressed == ('+') || keyBtnPressed == ('-') || keyBtnPressed == ('*') || keyBtnPressed == ('/')) {
        operVar = keyBtnPressed;        //simply replace the operator with the new one
        screen(first);
    } else if (keyBtnPressed == 0 && operVar == '/') {    //check divide by zero
        alert("!!!! CAN'T DIVIDE BY ZERO !!!!");
    } else if (keyBtnPressed == '.'){
        second = keyBtnPressed;
        screen(second);
    } else if (keyBtnPressed > 0 && keyBtnPressed <=9) {    //this fills 'second' with a digit 1 to 9
        second = "" + keyBtnPressed;
        screen(second);
    }
}
// STAGE 5: All Three full. 2nd = 1-9 or decimal
function stage5(keyBtnPressed){
    if (keyBtnPressed == 'Backspace') {
        second = second.toString().slice(0, -1);
        screen(second);
    } else if (keyBtnPressed == '+' || keyBtnPressed == '-' || keyBtnPressed == '*' || keyBtnPressed == '/') {
        if (second != '.'){
            results();
            operVar = keyBtnPressed;
        }        
    } else if (keyBtnPressed == '='){ //allow for = 
        if (second != '.'){
        results();
        }
    } else if (keyBtnPressed == 'Enter'){ //allow 'Enter'
        if (second != '.'){
        results();
        }
    }else if (keyBtnPressed == '.'){
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
    if(first == "" && second == "" && operVar == ""){
        stage1(keyBtnPressed);
    } else if(first=="" && operVar != ""){              
        stage2(keyBtnPressed);
    } else if(first != "" && operVar == "") {
        stage3(keyBtnPressed);
    } else if (first != "" && operVar != "" && second == "") {  
        stage4(keyBtnPressed);
    } else if (first != "" && operVar != "" && second != ""){
        stage5(keyBtnPressed);
    }
}

const display = document.getElementById("display");
display.innerText = "";

document.addEventListener('keydown', kbkey);