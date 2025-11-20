"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrdersSocket {
    handleConnection(socket) {
        socket.emit('ping', 'Hi iam a live socket connection');
    }
    middlewareImplementation(soccket, next) {
        return next();
    }
}
exports.default = OrdersSocket;
//# sourceMappingURL=orders.socket.js.map