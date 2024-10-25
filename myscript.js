let buffer='0';
const screen = document.querySelector(".screen");
let runningTotal = 0;
let previousOperator=null;

function buttonClick(value)//divides the buttons into 2 parts-> numbers and symbols 
{
    if(isNaN(parseInt(value)))//if a button is not a number parseInt returns Nan
    {
        handleSymbols(value);
    }
    else
    {
        handleNumbers(value);
    }
    rerender();//this function displays the value in buffer
}

function handleNumbers(number){
    if (buffer ==='0')//Start of entering a number or when screen shows 0, we replace 0 with the entry
    {
        buffer=number;
    }
    else//else we append
    {
        buffer+=number;
    }
}

function handleSymbols(symbol){
    switch(symbol){
        case 'C' : 
            buffer='0';
            runningTotal=0;
            break;//acts as the closing curly braces in if statement
        case '=' :
            if(previousOperator===null)//case where we have no operations before pressing =
            {
                return;
            }
            flushOperation(parseInt(buffer));
            buffer = "" + runningTotal;//converting to string before assignment
            previousOperator = null;//start from square 1 after = sign
            break;
        case '←' : 
            if(buffer.length===1)//this acts same when the screen has 1 number or '0'
            {
                buffer='0';
            }
            else//else removing the last digit
            {
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

function handleMath(value)//only if it is +, -, / or *
{
    if(buffer==='0')//this will return the number that is already there on screen if it is 0
    {
        return;
    }

    const intBuffer=parseInt(buffer);//buffer is currently having only the digits and not the operator
    if (runningTotal===0){
        runningTotal=intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOperator=value;//even if this is the initial operator, it is added here to the previousOperator
    buffer='0';
    
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

function init()//Any button click in  the container is analysed
{
    document
      .querySelector(".calc-buttons")
      .addEventListener("click", function (event) {
        buttonClick(event.target.innerText);//inner text gives the information of what the button actually is
      });
}

init();//start of program