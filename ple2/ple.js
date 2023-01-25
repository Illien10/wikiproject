const fieldsContainer = document.getElementById("fields-container");
const addFieldButton = document.getElementById("add-field-button");
const fieldNameInput = document.getElementById("field-name-input");

addFieldButton.addEventListener("click", function() {
    const fieldName = fieldNameInput.value;
    if (!fieldName) {
        return;
    }

    const fieldHTML = `
        <div class="range-field-container">
            <div class="range-field-name">${fieldName}</div>
            <label>Range 1: <input type="range" min="0" max="100" value="0" class="range-field-input" data-field-name="${fieldName}" data-range-id="1"></label>
            <label>Range 2: <input type="range" min="0" max="100" value="0" class="range-field-input" data-field-name="${fieldName}" data-range-id="2"></label>
            <label>Range 3: <input type="range" min="0" max="100" value="0" class="range-field-input" data-field-name="${fieldName}" data-range-id="3"></label>
            <button class="remove-field-button">Remove</button>
        </div>
    `;

    fieldsContainer.insertAdjacentHTML("beforeend", fieldHTML);
    fieldNameInput.value = '';
});

fieldsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-field-button")) {
        const fieldContainer = event.target.closest(".range-field-container");
        fieldsContainer.removeChild(fieldContainer);
    }
});



document.addEventListener("DOMContentLoaded", function() {
    // Get the canvas element where the chart will be rendered
    const chartCanvas = document.getElementById("chart-canvas");

    // Create a new pie chart
    const chart = new Chart(chartCanvas, {
        type: 'pie',
        data: {
            labels: [], // labels for the chart
            datasets: [{
                data: [], // data for the chart
                backgroundColor: [] // background color for each slice
            }]
        },
        options: {
            responsive: true, // make the chart responsive
            maintainAspectRatio: false
        }
    });

    // update chart when range inputs change
    document.querySelectorAll('.range-field-input').forEach(input => {
        input.addEventListener('change', function() {
            const fieldName = this.dataset.fieldName;
            const rangeId = this.dataset.rangeId;
            const value = this.value;

            // update chart data
            chart.data.labels.push(fieldName);
            chart.data.datasets[0].data.push(value);
            chart.data.datasets[0].backgroundColor.push(getRandomColor());
            chart.update();
        });
    });

    // generate a random color
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});