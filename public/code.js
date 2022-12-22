const socket = io("http://localhost:5000");

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatWindow = document.getElementById("chat-window");

chatForm.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Send the message to the server
  socket.emit("message", chatInput.value);
  // Clear the chat input
  chatInput.value = "";
});

// Handle message events from the server
socket.on("message", (message) => {
  //get current time, format it and add it to the message object

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  let messageObj = {
    username: "User",
    content: message,
    timestamp: currentTime,
  };
  // Create a new message element
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  // Set the class of the message element based on the username
  if (message.username === "User") {
    messageElement.classList.add("message", "self");
  } else {
    messageElement.classList.add("message", "other");
  }

  // Create the message content
  const messageContent = `
    <p class="username">${messageObj.username}</p>
    <p>${messageObj.content}</p>
    <p class="timestamp">${messageObj.timestamp}</p>
  `;

  // Set the message content as the inner HTML of the message element
  messageElement.innerHTML = messageContent;

  // Append the message element to the chat window
  chatWindow.appendChild(messageElement);

  // Scroll the chat window to the bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
