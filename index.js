// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAAUEyPBKx5BNpzLKZ0eDZUbxrlPWb-lmc",
  authDomain: "chatforrmzn.firebaseapp.com",
  databaseURL: "https://chatforrmzn-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatforrmzn",
  storageBucket: "chatforrmzn.appspot.com",
  messagingSenderId: "162701479811",
  appId: "1:162701479811:web:3808167a707a32a675f0b6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Please Tell Us Your Name");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document.getElementById("messages").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<h2 class="gradient-multiline"><span>${messages.message}</span></h2>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});


//add

