//TODO negtive number

function displayInput(component, field) {
    field.value = String(field.value) + component.textContent;
}

function displayOutput() {

}

function evaluate(eqn) {
    let leftStr="";
    let rightStr=eqn;
    let operator="";
    let leftValue=0;
    let rightValue=0;
    let operationList = ["+","-","*","/","%","(",")"];
    let sum=0;

    if(rightStr[0]=="(") {
        return getBracketValue(rightStr.slice(1))[0];
    }

    [leftValue, rightStr] = getLeftValue(rightStr);
    while(rightStr != "") {
        [operator, rightStr] = getOperator(rightStr);
        [rightValue, rightStr] = getRightValue(operator, rightStr);
        leftValue = excecuteOperation(leftValue, rightValue, operator);
    }
    return leftValue;
}
console.log("hi");
console.log(evaluate("-1+4/√(2*2)^2"));

function getOperator(inputString) {
    let remainedStr = inputString;
    return [remainedStr[0], remainedStr.slice(1)];
}

function getLeftValue(inputStr) {
    let operationList = ["+","-","*","/","%","(",")","^"];
    let returnValue=0;
    let valueStr="";
    let remainedStr = inputStr;

    if(remainedStr[0]=="(") {
        return getBracketValue(remainedStr.slice(1));
    }

    if(remainedStr[0]=="-") {
        remainedStr = remainedStr.slice(1);
        [returnValue, remainedStr] = getLeftValue(remainedStr);
        returnValue = -returnValue;
        return [returnValue, remainedStr];
    }

    if(remainedStr[0]=="√") {
        remainedStr = remainedStr.slice(1);
        [returnValue, remainedStr] = getLeftValue(remainedStr);
        returnValue **= 0.5;
        return [returnValue, remainedStr];
    }

    while(remainedStr != "" && operationList.indexOf(remainedStr[0])<0) {
        valueStr += remainedStr[0];
        remainedStr = remainedStr.slice(1);
    }
    returnValue = parseFloat(valueStr==""?"0":valueStr);
    if(remainedStr[0] == "%") {
        returnValue /= 100;
        remainedStr = remainedStr.slice(1);
    }

    return [returnValue, remainedStr];
}

function getRightValue(operator, inputStr) {

    let operationList = ["+","-","*","/","%","(",")"];
    let returnValue=0;
    let valueStr="";
    let remainedStr = inputStr;

    if(operator == "+" || operator == "-") {
        returnValue = evaluate(inputStr);
        remainedStr = "";
    }
    else if(operator == "*" || operator == "/" || operator == "^") {
        [returnValue, remainedStr] = getLeftValue(remainedStr);
    }
    else if(operator == "(") {
        [returnValue, remainedStr] = getBracketValue(inputStr);
    }

    return [returnValue, remainedStr];
}

function getBracketValue(inputStr) {

    let remainedStr = inputStr;
    let bracketCount = 1;
    let evalStr = "";
    
    do {
        if(remainedStr[0] == "(") {
            bracketCount++;
            
        }
        else if(remainedStr[0] == ")") {
            bracketCount--;
        }
        if(bracketCount != 0 ) {
            evalStr += remainedStr[0];
            
        }
        remainedStr = remainedStr.slice(1);
    } while(bracketCount != 0);

    
    return [evaluate(evalStr), remainedStr];

}


function excecuteOperation(leftValue, rightValue, operation) {
    
    let sum=0
    switch(operation) {
        case "+": 
            sum = leftValue + rightValue;
            break;
        case "-": 
            sum = leftValue - rightValue;
            break;
        case "*": 
            sum = leftValue * rightValue;
            break;
        case "/": 
            sum = leftValue / rightValue;
            break;
        case "^": 
            sum = leftValue ** rightValue;
            break;
        default:
            break;
    }
    return sum;
}



const inputDisplay = document.querySelector("#inputDisplay input");
const outputDisplay = document.querySelector("#outputDisplay p");
const inputButtonList = document.querySelectorAll(".input");
const functionButtonList = document.querySelectorAll(".function");
const back = document.querySelector("#back");
const cancel = document.querySelector("#cancel");
const equal = document.querySelector("#equal");

inputDisplay.value="";

inputButtonList.forEach(button => {
    button.addEventListener('click', ()=>{
        displayInput(button, inputDisplay);
    });
});

back.addEventListener('click', function back() {
    inputDisplay.value = inputDisplay.value.slice(0,-1);
});

cancel.addEventListener('click', function cancel() {
    inputDisplay.value = "";
});

equal.addEventListener('click', function equal() {
    outputDisplay.textContent = parseFloat(evaluate(inputDisplay.value));
});