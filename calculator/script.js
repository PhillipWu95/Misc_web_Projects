function displayInput(component, field) {
    field.value = String(field.value) + component.textContent;
}

function displayOutput() {

}

function evaluate() {

}

const inputDisplay = document.querySelector("#inputDisplay input");
const inputButtonList = document.querySelectorAll(".input");
const functionButtonList = document.querySelectorAll(".function");
const back = document.querySelector("#back");
const cancel = document.querySelector("#cancel");
const equal = document.querySelector("#equal");

inputDisplay.value=""

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
