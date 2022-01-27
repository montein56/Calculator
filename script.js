// const add = (x,y) => x + y;
// const subtract = (x,y) => x - y;
// const divide = (x,y) => x/y;
// const multiply = (x,y) => x*y;

const display = document.getElementById("display");
display.innerText = 0;

let first = ""; //first value
let second = "";//2nd value
let oper = "";

function enter(num){
    if (first == "" && second == "" && oper=='subtract') {
        first = num * -1;
    } else if (first == "") {
        first = num;
    } else {
        if(first<0){
            first = first*10 - num;
        } else {
            first = (first*10) + num;
        }
    }
        screen (first);
    }


function operate(operator) {
    oper = operator;
    if (second == "" && first == "") {
        second = 0;
    }else if (second == "" && first != "") {
        second = first;
        first = "";
    }
    screen(second);
}

function results(){
    switch (oper) {
        case "add":
            first = second + first;
            break;
        case "subtract":
            first = second - first;
            break;
        case "multiply":
            first = second * first;
            break;
        case "divide":
            first = second / first;
            break;
    }
    second = "";
    screen (first);
}

function screen(output){    
    display.innerText = Math.round(output * 1000) / 1000;}

    // output.parseFloat(x).toExponential(f);


function clearAll(){
    first = "";
    second = "";
    oper = "";
    screen(0);
}