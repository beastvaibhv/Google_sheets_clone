let columns = 26;
const rows = 100;
const headerElement = document.querySelector(".header");
const serialNumber = document.querySelector(".sno");
const mainContainer = document.querySelector(".row-container");
function createHeaderElement(){
    for(let i = 0 ; i <= columns; i++){
        const headerCell = document.createElement("div");
        headerCell.className="header-cell"
        if(i !== 0){
            headerCell.textContent = String.fromCharCode(64 + i);

        }
        headerElement.appendChild(headerCell);
    }
}



function createSerialNumber(){
    for(let i = 0; i < rows; i++){
        const serialNumberCell = document.createElement("div");
        serialNumberCell.textContent = i + 1;
        serialNumber.appendChild(serialNumberCell);
    }

}

function createRow(rowNumber){
    const row = document.createElement("div");
    row.className = "row";
    for(let i = 1; i <= columns; i++){
        const cell = document.createElement("div");
        cell.className ="cell main-cell";
        cell.contentEditable="true";
        cell.id = String.fromCharCode(64 + i) + rowNumber;
        cell.addEventListener("focus", onCellFocus);
        cell.addEventListener("input", onFormChange);
        row.appendChild(cell);
    }
    mainContainer.appendChild(row);
}

function onCellFocus(event) {
    const elementId = event.target.id;
    cellNamePlaceholder.innerText = elementId;
    activeElement = event.target;
    if (state[elementId]) {
        // already selected cell
        // fill the options with the state of that cell
        resetOptions(state[elementId]);
    }
    else {
        // selected for the first time
        // fill the options with default state
        resetOptions(defaultProperties);
    }
}

function buildMainContent() {
    // loop for 100 times
    for (let i = 1; i <= rows; i++) {
        createRow(i);
    }
}



const cellNamePlaceholder = document.querySelector("#active-cell");
const fontSizeInput = document.querySelector("#fontsize");
const fontFamilyInput = document.querySelector("#fontfamily");
const form = document.querySelector("#form")

let activeElement = null;

const state = {};

const defaultProperties = {
    fontFamily: 'sans',
    fontSize: 16,
    color: "#000000",
    textAlign: "left", // "left", "center", "right"
    backgroundColor: "#ffffff",
    isBold: false,
    isItalic: false,
    isUnderlined: false,
    value: ''
}



function resetOptions(optionsState) {
    // updates the UI as per the optionsState
  
    form.fontfamily.value = optionsState.fontFamily;
    form.fontsize.value = optionsState.fontSize;
    form.textalign.value = optionsState.textAlign; // "right" | "left" | "center"
    form.bold.checked = optionsState.isBold
    form.italic.checked = optionsState.isItalic;
    form.underlined.checked = optionsState.isUnderlined;
    form.textcolor.value = optionsState.color;
    form.bgcolor.value = optionsState.backgroundColor;
}

function onFormChange() {
    if (!activeElement) {
        alert("Please select a cell to make changes");
        form.reset();
        return;
    }


    let currentState = {
        textColor: form.textcolor.value,
        backgroundColor: form.bgcolor.value,
        fontSize: form.fontsize.value,
        fontFamily: form.fontfamily.value,
        isBold: form.bold.checked,
        isItalic: form.italic.checked,
        isUnderlined: form.underlined.checked,
        textAlign: form.textalign.value 
    }

  
    applyStylesToCell(currentState);

    // update the state object for the current cell.
   
    state[activeElement.id] = { ...currentState, value: activeElement.innerText };
}

function applyStylesToCell(styleObject) {
   
    activeElement.style.fontSize = `${styleObject.fontSize}px`;
    activeElement.style.fontFamily = styleObject.fontFamily;
    activeElement.style.color = styleObject.textColor;
    activeElement.style.backgroundColor = styleObject.backgroundColor;
    activeElement.style.textAlign = styleObject.textAlign;

    activeElement.style.fontWeight = styleObject.isBold ? "bold" : "normal";
    activeElement.style.fontStyle = styleObject.isItalic ? "italic" : "normal";
    activeElement.style.textDecoration = styleObject.isUnderlined ? "underline" : "none";
}




createHeaderElement();
createSerialNumber();
buildMainContent();