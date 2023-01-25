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
            <canvas class="chart-canvas"></canvas>
        </div>
    `;

    fieldsContainer.insertAdjacentHTML("beforeend", fieldHTML);
    fieldNameInput.value = '';
    
    fieldsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-field-button")) {
            const fieldContainer = event.target.closest(".range-field-container");
            fieldsContainer.removeChild(fieldContainer);
        }
    });

    // Get the newly added canvas
    const canvas = document.querySelector('.chart-canvas');

    // Get the range inputs
    const rangeInputs = document.querySelectorAll('.range-field-input');

    // Initialize chart with the range inputs values
    const chart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: [rangeInputs[0].dataset.fieldName, rangeInputs[1].dataset.fieldName, rangeInputs[2].dataset.fieldName],
            datasets: [{
                label: '# of Votes',
                data: [rangeInputs[0].value, rangeInputs[1].value, rangeInputs[2].value],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});