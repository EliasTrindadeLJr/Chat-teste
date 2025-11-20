import { Socket } from "socket.io";

class ChatSocket {
    handleConnection(socket: Socket) {
        console.log('Novo usuario no chat');

        socket.on("message",(msg) => {
            socket.nsp.emit("new_message",msg);
        })
    }
}

export default ChatSocket;