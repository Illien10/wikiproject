const fieldsContainer = d3.select("#fields-container");
const addFieldButton = d3.select("#add-field-button");
const fieldNameInput = d3.select("#field-name-input");

addFieldButton.on("click", function() {
    const fieldName = fieldNameInput.property("value");
    if (!fieldName) {
        return;
    }

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

    fieldsContainer.html(fieldsContainer.html() + fieldHTML);
    fieldNameInput.value = '';
    
    // Add event listener for input change on range inputs
    const rangeInputs = fieldsContainer.selectAll(".range-field-input");
    rangeInputs.on("input", function() {
    const fieldContainer = d3.select(this.closest(".range-field-container"));
    if (fieldContainer.empty()) return;
    const fieldName = fieldContainer.attr("data-field-name");
    const rangeId = d3.select(this).attr("data-range-id");
    const value = +d3.select(this).property("value");

    // Get the canvas element for this field
    const canvas = fieldContainer.select(".chart-canvas");

    // Get the other range input values for this field
    const rangeInputs = fieldContainer.selectAll(".range-field-input");
    let otherValues = [];
    rangeInputs.each(function() {
        if (d3.select( this).attr("data-range-id") !== rangeId) {
            otherValues.push(+d3.select(this).property("value"));
        }
    });

    // Calculate the total value of all the range inputs
    const totalValue = value + otherValues.reduce((a, b) => a + b, 0);

    // Get the canvas 2D rendering context
    const context = canvas.node().getContext("2d");

    // Clear the previous chart
    context.clearRect(0, 0, canvas.attr("width"), canvas.attr("height"));

    // Create the data for the chart
    const data = [value, ...otherValues];

    // Define the color scale
    const color = d3.scaleSequential()
        .range(["#f44336", "#4caf50", "#2196f3"]);

    // Define the pie chart layout
    const pie = d3.pie()
        .sort(null)
        .value(d => d);

    // Define the arc generator
    const arcs = pie(data);

    // Draw the chart
    let startAngle = 0;
    for (let i = 0; i < arcs.length; i++) {
        context.beginPath();
        context.arc(canvas.attr("width") / 2, canvas.attr("height") / 2, canvas.attr("height") / 2, startAngle, startAngle + arcs[i].endAngle);
        context.lineTo(canvas.attr("width") / 2, canvas.attr("height") / 2);
        context.fillStyle = color(i);
        context.fill();
        startAngle += arcs[i].endAngle;
    }
});

// Add event listener for remove button click
d3.selectAll(".remove-field-button").on("click", function() {
    d3.select(this.closest(".range-field-container")).remove();
});})
