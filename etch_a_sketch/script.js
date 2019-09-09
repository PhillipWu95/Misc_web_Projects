const mainContent = document.querySelector(".mainContent");
let gridSize = 16;
let drawingPad = document.createElement("div");
let buttonClicked = "new";
mainContent.appendChild(drawingPad);

function setGridSize(component, gridSize=16, backgroundColor="black") {
    let drawingPadAttr = 
        "display: grid;"
        + "background-color: " + backgroundColor + ";"
        + "grid-template-columns: repeat(" + gridSize + ",1fr);"
        + "grid-template-rows: repeat(" + gridSize + ",1fr);"
        + "text-align: center;"
        + "margin: 0 auto;"
        + "width: 969px;"
        + "height: 960px;"
        + "border: solid 2px red;";

        component.setAttribute("style", drawingPadAttr);
        initElements(gridSize);
        let allElements=document.querySelectorAll(".gridComponent");
        return allElements;
}

function initDrawingPad() {
    allElements =  setGridSize(drawingPad);
    return allElements;
}


allGridElements = initDrawingPad();
// allGridElements.forEach(element => {
//     console.log(element);
// });


// let drawingPadAttr = 
// "display: grid;"
// + "background-color: black;"
// + "grid-template-columns: repeat(" + gridSize + ",1fr);"
// + "grid-template-rows: repeat(" + gridSize + ",1fr);"
// + "text-align: center;"
// + "margin: 0 auto;"
// + "width: 969px;"
// + "height: 960px;"
// + "border: solid 2px red;";

// drawingPad.setAttribute("style", drawingPadAttr);

function setDrawingColor(component, color="white") {
    component.setAttribute("style", "background-color: " + color + ";");
}

function removeSetColor(component) {
    component.removeEventListener("mouseover", setColor);
}

function initElements(gridSize) {
    let i;
    let j;
    for(i = 0; i < gridSize; i++) {
        for(j = 0; j < gridSize; j++) {
            let gridComponent = document.createElement("div");
            drawingPad.appendChild(gridComponent);
            gridComponentAttr = ""
                + "grid-area: " + i+1 + "/" + j+1 + "/" + i+2 + "/" + j+2 + ";";
            gridComponent.classList.add("gridComponent");
            gridComponent.addEventListener("mouseover", function setColor() {
                    setDrawingColor(gridComponent);   
                    removeSetColor(gridComponent);
                }
            );
            
        }
    }
}


function randomColor() {
    let ran255 = () => {
        return Math.floor(255 * Math.random());
    }
    // console.log(ran255());
    let rgb = ""
            + "rgb(" + ran255()
            + ","    + ran255()
            + ","    + ran255()
            + ")";
    return rgb;
}

const colorBtn = document.querySelector("#color");
const rainbowBtn = document.querySelector("#rainbow");
const newBtn = document.querySelector("#new");


rainbowBtn.addEventListener('click', function rainbowBtnEvent() {
        allGridElements.forEach((gridComponent) => {
            gridComponent.addEventListener("mouseover", function setColor() {
                setDrawingColor(gridComponent, randomColor());
                gridComponent.removeEventListener("mouseover", setColor);
            });
        });
    }
);

newBtn.addEventListener('click', function newBtnEvent() {
    let gridSize = parseInt(prompt("Enter grid size: "));
    while(isNaN(gridSize) || gridSize < 1) {
        gridSize = prompt("Enter grid size: (in positive number please)");
    }
    allGridElements =  setGridSize(drawingPad, gridSize);
    allGridElements.forEach((gridComponent) => {
        gridComponent.setAttribute("style", "backgroud-color: black;");
        gridComponent.addEventListener("mouseover", function setColor() {
            setDrawingColor(gridComponent);
            gridComponent.removeEventListener("mouseover", setColor);
        });
    });
});
