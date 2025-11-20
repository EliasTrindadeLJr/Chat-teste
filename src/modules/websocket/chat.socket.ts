import { Socket } from "socket.io";


class ChatSocket {
    handleConnection(socket: Socket) {
        socket.data.username = socket.handshake.auth.username || "Usuário";
        console.log('Novo usuario', socket.data.username);
        socket.on("message",(msg) => {
            socket.nsp.emit("message",msg, {
                user: socket.data.username,
                text: msg
            });
        });
        socket.on("typing", () => {
            socket.broadcast.emit("user_typing", socket.data.username);
        });
        socket.on("stop_typing", () => {
            socket.broadcast.emit("user_stop_typing", socket.data.username);
        });
    }
}

export default ChatSocket;