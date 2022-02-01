const display = document.getElementById("display");
display.innerText = "";

let first = ""; 
let second = "";
let operVar = "";

//CLEAR DISPLAY
function clearAll(){
    first = "";
    second = "";
    operVar = "";
    display.innerText = "";
    screen("");
}

//RUN DISPLAY- max ?? decimal places
function screen(output){
    if (isNaN(output)){
            display.innerText = output;
    } else {
        display.innerText = Math.round(output * 1000000) / 1000000;
}
}

//CALLED BY 'EQUAL' KEY & BY ANY OPERATOR KEY WHEN BOTH first & second VARIABLES ARE SET
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
    operVar="";
    screen (first);
}


//MAIN FUNCTION CALLED BY ALL KEYS EXCEPT 'equal' & 'clearAll'
function enter(key){
    if(first=="" && second == "" && operVar == ""){ //STAGE1: BLANK
        if(key == "." || key == "-"){               //capture initial -ve & decimals
            operVar = key;
            screen(operVar);
                        
        } else if (key <= 9 && key > 0){
            first = key;
            screen(first);
        }
    } else if(first=="" && operVar != ""){  //STAGE2: only operVal full
        if (key == 'backspace') {
            operVar = "";
            screen(operVar);
        }
        if (key <= 9){                      //concatenate first digit entered after initial minus or dot
            first = "" + operVar + key;
            operVar = "";
            screen(first);
        } else if (key == '.'){
            if (operVar == '.'){            //trap for more than one decimal
                operVar = '.';
            } else operVar = '-.';          //capture negative decimals
            screen(operVar);
        }
    } else if(first != "" && operVar == "") { //STAGE3: Only first full, capture operator
        if (key == 'backspace') {
            first = first.toString().slice(0, -1);
            screen(first);
        }
        if (key == '+' || key == '-' || key == '*' || key == '/')  {
            operVar = key;
        }
        else if (key == '.'){
            if (display.innerText.includes('.')){   //trap for more than one decimal
                first = first;
            } else {
                first = first + key;
                screen(first);
            }
        }
        else if (key <= 9){
            first = "" + first + key;
            screen(first);
        }
        screen(first);

        if(first.length > 10){
            alert('too many digits'); // limit # of digits entered in 'first' variable
            clearAll();            
        }

    } else if (first != "" && operVar != "" && second == "") { // STAGE 4: Only 2nd MT
        if (key == 'backspace') {
            operVar = "";
            screen(operVar);
        }
        if (key == ('+') || key == ('-') || key == ('*') || key == ('/')) {
            operVar = key;
            screen(first);
        }
        else {
            if (key != 0) {
            second = "" + key;
            screen(second);
        }
    }
    } else if (first != "" && operVar != "" && second != ""){ //STAGE 5: All Three full
        if (key == 'backspace') {
            second = second.toString().slice(0, -1);
            screen(second);
        }
        if (key == '+' || key == '-' || key == '*' || key == '/'){
            results();
            operVar = key;
        }
        else if (key == '.'){
            if (display.innerText.includes('.')){   //trap for more than one decimal
                second = second;
            } else {
                second = "" + second + key;
                screen(second);
            }
        }
        else if (key <= 9){
            second = "" + second + key;
            screen(second);
        }
        if(second.length > 12){         // limit # of digits entered in 'first' variable
            alert('too many digits');
            clearAll(second);
        }
}
}