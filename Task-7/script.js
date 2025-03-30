
const person1selector = document.querySelector("#contact1-selector");
const person2selector = document.querySelector("#contact2-selector");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInputBox = document.querySelector(".chat-input-box");
const chatInput = document.querySelector(".chat-input");
const clearChatButton = document.querySelector(".clear-button");

const messages = JSON.parse(localStorage.getItem("messages")) || [];

const createChatMessageElement = (message) => `
  <div class="message ${
    message.sender === "Person 1" ? "white-bg" : "gray-bg"
  }">
    <div class="message-sender">${message.sender}</div>
    <p class="message-text">${message.text}</p>
    <span class="message-timestamp">${message.timestamp}</span>
  </div>
`;

let messageSender = "Person 1";

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting ...`;
  chatInput.placeholder = `Type a message to ${messageSender}`;

  if (name === "Person 1") {
    person1selector.classList.add("active-person");
    person2selector.classList.remove("active-person");
  }
  if (name === "Person 2") {
    person2selector.classList.add("active-person");
    person1selector.classList.remove("active-person");
  }
  chatInput.focus();
};

person1selector.onclick = () => {
  updateMessageSender("Person 1");
};

person2selector.onclick = () => {
  updateMessageSender("Person 2");
};

const sendMessage = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
    const message = {
      sender: messageSender,
      text: chatInputBox.value,
      timestamp,
    };
  
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
    chatMessages.innerHTML += createChatMessageElement(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInputBox.value = ""; 
  };
  

chatInput.addEventListener("submit", sendMessage);

clearChatButton.addEventListener("click", () => {
  localStorage.removeItem("messages");
  chatMessages.innerHTML = "";
  messages.length = 0;
});