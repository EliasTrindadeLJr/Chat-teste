const username = prompt("Digite seu nome:");

const socket = io("http://localhost:3000/chat", {
    auth: { username }
});

const ul = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("msg");
const typingDiv = document.getElementById("typing-area");

socket.on("connect",()=>{
    console.log("Conectou ao servidor!");
});

socket.on("message", (msg)=> {
    const time = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
    
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `${time}-${msg.user}: ${msg.text}`; //Usuario e mensagem
    ul.appendChild(li);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const mensagem = {
        user: username,
        text: input.value,
        time: new Date()
    };

    socket.emit("message",mensagem);
    input.value = "";
})

let typingTimeout;

input.addEventListener("input", () => {
    socket.emit("typing");

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
        socket.emit("stop_typing");
    }, 1500);
});

socket.on("user_typing", (username) => {
    typingDiv.textContent = `${username} está digitando...`;
});

socket.on("user_stop_typing", () => {
    typingDiv.textContent = "";
});