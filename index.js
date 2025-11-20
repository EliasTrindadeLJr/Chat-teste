const username = prompt("Digite seu nome:");

const socket = io("http://localhost:3000/chat", {
    auth: { username }
});

const ul = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("msg");

socket.on("connect",()=>{
    console.log("Conectou ao servidor!");
});

socket.on("message", (msg)=> {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `${msg.user}:${msg.text}`; //Usuario e mensagem
    ul.appendChild(li);
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const mensagem = {
        user: username,
        text: input.value
    };

    socket.emit("message",mensagem);
    input.value = "";
})
