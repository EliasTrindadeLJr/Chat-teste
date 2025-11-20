import { Socket } from "socket.io";
import MySocketInterface from "./mySocketInterface";

class OrdersSocket implements MySocketInterface {
    handleConnection(socket: Socket){
        console.log("Usuario conectado ao chat /orders");
        socket.emit('ping','Hi iam a live socket connection');
    }

    middlewareImplementation(soccket: Socket, next: any) {
        return next();
    }
}

export default OrdersSocket;