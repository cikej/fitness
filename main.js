document.getElementById('meal-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let mealName = document.getElementById('meal-name').value;
    let mealCalories = document.getElementById('meal-calories').value;

    // Send meal data to the backend
    fetch('/add-meal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: mealName,
            calories: mealCalories
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert('Meal added successfully!');
            document.getElementById('meal-form').reset();
            updateSummary();
        }
    });
});

document.getElementById('exercise-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let exerciseName = document.getElementById('exercise-name').value;
    let exerciseTime = document.getElementById('exercise-time').value;

    // Send exercise data to the backend
    fetch('/add-exercise', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: exerciseName,
            time: exerciseTime
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert('Exercise added successfully!');
            document.getElementById('exercise-form').reset();
            updateSummary();
        }
    });
});

// Fetch the summary from the backend
function updateSummary() {
    fetch('/get-summary')
        .then(response => response.json())
        .then(data => {
            let summaryOutput = document.getElementById('summary-output');
            summaryOutput.innerHTML = `<p>Total Calories: ${data.totalCalories}</p>
                                       <p>Total Exercise Time: ${data.totalExerciseTime} minutes</p>`;
        });
}

// Initial summary fetch
updateSummary();