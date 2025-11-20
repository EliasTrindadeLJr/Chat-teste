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
        })
    }
}

export default ChatSocket;