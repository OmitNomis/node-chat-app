const socket = io();

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatWindow = document.getElementById("chat-window");

const usernameForm = document.getElementById("username-form");
const usernameInput = document.getElementById("username-input");
const chatroom = document.getElementById("chatroom");
const savedUsername = sessionStorage.getItem("username");

if (savedUsername) {
  // Hide the username form
  usernameForm.style.display = "none";
  // Show the chatroom
  chatroom.classList.add("visible");

  // Set the username on the socket object
  socket.emit("username", savedUsername);
} else {
  usernameForm.addEventListener("submit", (event) => {
    // Prevent the default form submission behavior
    // event.preventDefault();

    // Save the entered username in the session storage
    // Send the entered username to the server
    socket.emit("newUser", usernameInput.value);
    socket.emit("username", usernameInput.value);
    sessionStorage.setItem("username", usernameInput.value);

    // Hide the username form
    usernameForm.style.display = "none";

    // Show the chatroom
    chatroom.classList.add("visible");
  });
}

chatForm.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Send the message to the server
  socket.emit("message", chatInput.value);
  // Clear the chat input
  chatInput.value = "";
});
socket.on("newUser", (username) => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  // Create the message content
  const messageContent = `
  <div class="newUser">
    <p><em>${username} has joined the chat</em></p>
  </div>
  `;
  // Set the message content as the inner HTML of the message element
  messageElement.innerHTML = messageContent;

  // Append the message element to the chat window
  chatWindow.appendChild(messageElement);

  // Scroll the chat window to the bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

// Handle message events from the server
socket.on("message", (messageObj) => {
  //get current time, format it and add it to the message object

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  // Create a new message element
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  // Set the class of the message element based on the username
  if (messageObj.username === savedUsername) {
    messageElement.classList.add("message", "self");
  } else {
    messageElement.classList.add("message", "other");
  }

  // Create the message content
  const messageContent = `
    <div class="messageWrapper">
    <p class="username">${messageObj.username}</p>
    <p>${messageObj.content}</p>
    <p class="timestamp">${currentTime}</p>
    </div>
  `;

  // Set the message content as the inner HTML of the message element
  messageElement.innerHTML = messageContent;

  // Append the message element to the chat window
  chatWindow.appendChild(messageElement);

  // Scroll the chat window to the bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
