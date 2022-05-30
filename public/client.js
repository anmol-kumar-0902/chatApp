
//  const path = require('path');
// console.log(path.join(__dirname,"/public"));
const socket = io('http://localhost:8000');


const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

var audio = new Audio("ting.mp3");

const append = (message, position) => {
  

  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};

//const name="Bharat";
const name = prompt("Enter Your Name :");
socket.emit("new-user-joined", name);


socket.on("user-joined", (name) => {
  append(`${name} Joined the Chat`, "right");
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("left", (name) => {
  append(`${name} left the chat`, "right");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});