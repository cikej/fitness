<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fitness_tracker";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = date("Y-m-d"); // Get today's date

    if (isset($_POST["meal-name"]) && isset($_POST["meal-calories"])) {
        $meal_name = $_POST["meal-name"];
        $meal_calories = $_POST["meal-calories"];
        $sql = "INSERT INTO meals (meal_name, calories, date) VALUES ('$meal_name', '$meal_calories', '$date')";
    } elseif (isset($_POST["exercise-name"]) && isset($_POST["exercise-time"])) {
        $exercise_name = $_POST["exercise-name"];
        $exercise_time = $_POST["exercise-time"];
        $sql = "INSERT INTO exercises (exercise_name, time_minutes, date) VALUES ('$exercise_name', '$exercise_time', '$date')";
    }

    if ($conn->query($sql) === TRUE) {
        echo "Record added successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>