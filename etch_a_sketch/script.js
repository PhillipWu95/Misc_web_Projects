const mainContent = document.querySelector(".mainContent");
let gridSize = 16;

let drawingPad = document.createElement("div");
mainContent.appendChild(drawingPad);
let drawingPadAttr = 
"display: grid;"
+ "background-color: black;"
+ "grid-template-columns: repeat(" + gridSize + ",1fr);"
+ "grid-template-rows: repeat(" + gridSize + ",1fr);"
+ "text-align: center;"
+ "margin: 0 auto;"
+ "width: 500px;"
+ "height: 500px;"
+ "border: solid 2px red;";

drawingPad.setAttribute("style", drawingPadAttr);

function gridComponentEvent(component, color="white") {
    component.setAttribute("style", "background-color: " + color + ";");
}

var i;
var j;
for(i = 0; i < gridSize; i++) {
    for(j = 0; j < gridSize; j++) {
        let gridComponent = document.createElement("div");
        drawingPad.appendChild(gridComponent);
        gridComponentAttr = ""
            + "grid-area: " + i+1 + "/" + j+1 + "/" + i+2 + "/" + j+2 + ";";
        gridComponent.addEventListener("mouseover", () => {gridComponentEvent(gridComponent);});
    }
}