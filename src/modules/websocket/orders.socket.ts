import { Socket } from "socket.io";
import MySocketInterface from "./mySocketInterface";
import OrdersService from "../../libs/order.service";

class OrdersSocket implements MySocketInterface {
    handleConnection(socket: Socket){
        console.log("Client connected to /orders");
        socket.emit('ping','Hi iam a live socket connection');
    }

    middlewareImplementation(soccket: Socket, next: any) {
        return next();
    }
}

export default OrdersSocket;