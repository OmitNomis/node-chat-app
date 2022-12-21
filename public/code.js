const socket = io();

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatWindow = document.getElementById("chat-window");

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Send the message to the server
  socket.emit("message", chatInput.value);
  // Clear the chat input
  chatInput.value = "";
});

// Handle message events from the server
socket.on("message", (message) => {
  // Create a new message element
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  // Create the message content
  const messageContent = `
    <p class="username">${message.username}</p>
    <p>${message.content}</p>
    <p class="timestamp">${message.timestamp}</p>
  `;

  // Set the message content as the inner HTML of the message element
  messageElement.innerHTML = messageContent;

  // Append the message element to the chat window
  chatWindow.appendChild(messageElement);

  // Scroll the chat window to the bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
