const socket = io("http://localhost:3000/chat")

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
        user:"Usuario" + socket.id.substring(0,4),
        text: input.value
    };

    socket.emit("message",mensagem);
    input.value = "";
})
