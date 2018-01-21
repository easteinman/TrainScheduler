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
  var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: trainTime,
    frequency: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().role;
  var trainTime = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().rate;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  // Prettify the train time
  var trainTimePretty = moment.unix(trainTime).format("HH:mm");