document.getElementById('meal-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let mealName = document.getElementById('meal-name').value;
    let mealCalories = document.getElementById('meal-calories').value;

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

updateSummary();
