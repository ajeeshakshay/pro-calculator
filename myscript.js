let buffer='0';
const screen = document.querySelector(".screen");
let runningTotal = 0;
let previousOperator=null;

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbols(value)
    }
    else{
        handleNumbers(value)
    }
    rerender();//this function displays the value in buffer
}

function handleNumbers(number){
    if (buffer ==='0'){
        buffer=number;
    }
    else{
        buffer+=number;
    }
}

function handleSymbols(symbol){
    switch(symbol){
        case 'C' : 
            buffer='0';
            break;//acts as the closing curly braces in if statement
        case '=' :
            if(previousOperator===null){

                return;
            }
            flushOperation(parseInt(buffer));
            buffer = "" + runningTotal;
            previousOperator = null;

            break;
        case '←' : 
            if(buffer.length===1){
                buffer='0';
            }
            else{
                buffer=buffer.substring(0,buffer.length-1);
            }
            break;
        case '+' : 
        case '-' :
        case '÷' :
        case '×' :            
            handleMath(symbol);
            break;    
    }
}

function handleMath(value){
    if(buffer==='0'){
        return;
    }

    const intBuffer=parseInt(buffer);
    if (runningTotal===0){
        runningTotal=intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOperator=value;
    buffer='0';
    console.log(runningTotal);
    
}

function flushOperation(value){
    if(previousOperator==='+'){
        runningTotal+=value;
    }
    else if(previousOperator==='-'){
        runningTotal-=value;
    }
    else if(previousOperator==='÷'){
        runningTotal/=value;
    }
    else if(previousOperator==='×'){
        runningTotal*=value;
    }
}

function rerender(){
    screen.innerText = buffer;
}

function init() {
    document
      .querySelector(".calc-buttons")
      .addEventListener("click", function (event) {
        buttonClick(event.target.innerText);
      });
}

init();//start of program