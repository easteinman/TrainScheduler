// Initialize Firebase
var config = {
  apiKey: "AIzaSyBdoPKFS4xPCvYELpxsnHMkbyp4TVXvjGE",
  authDomain: "train-scheduler-d37b3.firebaseapp.com",
  databaseURL: "https://train-scheduler-d37b3.firebaseio.com",
  projectId: "train-scheduler-d37b3",
  storageBucket: "train-scheduler-d37b3.appspot.com",
   messagingSenderId: "663370710067"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainStart = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainStart,
    frequency: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Choo choo! The train has been added successfully.");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// Create a Firebase event for adding the new train to the database and add a row in the html when a user adds a new train
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var frequency = childSnapshot.val().frequency;

  // Calculating the difference between the first train time and the current time
  var difference = moment().diff(moment.unix(trainStart), "minutes");

  // Calculating the number of times the train has arrived since it started until now
  var timeLeft = moment().diff(moment.unix(trainStart), 'minutes') % frequency;

  // Calculating how many minutes are left until the next train
  var mins = moment(frequency - timeLeft, "mm").format('mm');

  // Add the minutes left to the current time to show the time the next train will arrive
  var nextTrain = moment().add(mins, "m").format("hh:mm A");

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + mins + "</td></tr>");

});