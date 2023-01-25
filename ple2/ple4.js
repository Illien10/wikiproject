const fieldsContainer = d3.select("#fields-container");
const addFieldButton = d3.select("#add-field-button");
const fieldNameInput = d3.select("#field-name-input");

const colorCodes = ["#f44336", "#4caf50", "#2196f3"];

// Add event listener for button click
addFieldButton.on("click", function() {
    const fieldName = fieldNameInput.property("value");
    if (!fieldName) {
        return;
    }

    // Append new field HTML
    const fieldHTML = `
        <div class="range-field-container" data-field-name="${fieldName}">
            <div class="range-field-name">${fieldName}</div>
            <label>Profesión: <input type="range" min="0" max="100" value="0" class="range-field-input" data-range-id="1"></label>
            <label>Hobbies: <input type="range" min="0" max="100" value="0" class="range-field-input" data-range-id="2"></label>
            <label>Socializar: <input type="range" min="0" max="100" value="0" class="range-field-input" data-range-id="3"></label>
            <button class="remove-field-button">Remove</button>
            <canvas class="chart-canvas" width="200" height="200"></canvas>
        </div>
    `;
    fieldsContainer.append(() => {
        const div = document.createElement("div");
        div.innerHTML = fieldHTML;
        return div;
    });
    fieldNameInput.value = '';
});

// Add event listener for input change on range inputs
fieldsContainer.on("input", ".range-field-input", function() {
    const fieldContainer = d3.select(this.node.parent.this.node.parent);
    if (fieldContainer.empty()) return;
    const fieldName = fieldContainer.attr("data-field-name");
    const rangeId = d3.select(this).attr("data-range-id");
    const value = +d3.select(this).property("value");

    // Get the canvas element for this field
    const canvas = fieldContainer.select(".chart-canvas");

    // Get the other range input values for this field
    const rangeInputs = fieldContainer.selectAll(".range-field-input");
    let data = [];
    rangeInputs.each(function() {
        const rangeId = d3.select( this).attr("data-range-id");
        const value = +d3.select(this).property("value");
        data.push({ value, color: colorCodes[rangeId - 1] });
    });
});

// Add event listener for remove button click
fieldsContainer.on("click", ".remove-field-button", function() {
    const fieldContainer = d3.select(this.parentNode);
    if (fieldContainer.empty()) return;
    fieldContainer.remove();
});
function drawChart(canvas, data) {    
    // Set up arc generator
    const arcGenerator = d3.arc();
    arcGenerator.innerRadius(70).outerRadius(100);

    // Set up pie generator
    const pieGenerator = d3.pie();
    pieGenerator.sort(null).value(d => d.value);

    // Set up canvas
    const context = canvas.node().getContext("2d");

    // Create chart
    context.clearRect(0, 0, 200, 200);
    const arcs = pieGenerator(data);
    arcs.forEach((arc, index) => {
        context.fillStyle = arc.data.color;
        context.beginPath();
        arcGenerator.context(context)(arc);
        context.fill();
    });
}