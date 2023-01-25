// Get the form element
const createCheckboxButton = document.querySelector('#create-checkbox-button');
const checkboxContainer = document.querySelector('.checkbox-container');
const checkboxNameInput = document.querySelector('#checkbox-name');

// Add a click event listener to the "Create Checkbox" button
createCheckboxButton.addEventListener('click', function() {
    // Get the checkbox name from the input field
    const checkboxName = checkboxNameInput.value;
    // Create a new div container for the checkbox and gradients
    const customCheckbox = document.createElement("div");
    customCheckbox.classList.add("custom-checkbox");
    // Create the checkbox and gradients
    customCheckbox.innerHTML = `
        <input type="checkbox" id="${checkboxName}" name="${checkboxName}">
        <label for="${checkboxName}">${checkboxName}</label>
        <label for="socializing">Socializing:</label>
        <input type="range" min="0" max="100" value="50" class="gradient1" id="socializing">
        <label for="hobbies">Hobbies:</label>
        <input type="range" min="0" max="100" value="50" class="gradient2" id="hobbies">
        <label for="profession">Profession:</label>
        <input type="range" min="0" max="100" value="50" class="gradient3" id="profession">
    `;
    // Append the checkbox and gradients to the checkbox container
    checkboxContainer.appendChild(customCheckbox);
});
//canvas
// Get the chart canvas
var ctx = document.getElementById("chart").getContext("2d");

// Create a new bar chart
var chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Socializing", "Hobbies", "Profession"],
        datasets: [{
            label: "Gradients",
            data: [0, 0, 0],
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// Get the gradient input elements
const gradient1Input = document.getElementById("socializing");
const gradient2Input = document.getElementById("hobbies");
const gradient3Input = document.getElementById("profession");

// Update the chart with the data from the gradients
gradient1Input.addEventListener("input", function() {
    chart.data.datasets[0].data[0] = this.value;
    chart.update();
});
gradient2Input.addEventListener("input", function() {
    chart.data.datasets[0].data[1] = this.value;
    chart.update();
});
gradient3Input.addEventListener("input", function() {
    chart.data.datasets[0].data[2] = this.value;
    chart.update();
});