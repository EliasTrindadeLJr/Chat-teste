import Websocket from "../modules/websocket/websocket";

class OrdersService {

    private static instance: OrdersService;
    private orders: any[] = [];

    private constructor() {}

    public static getInstance() {
        if (!OrdersService.instance) {
            OrdersService.instance = new OrdersService();
        }
        return OrdersService.instance;
    }

    public insertOrder(order) {
        this.orders.push(order);
        this.updateSockets();
    }

    private updateSockets() {
        const io = Websocket.getInstance();
        io.of('/orders').emit('orders_updated', { data: this.orders });
    }

    public getAllOrders() {
        return this.orders;
    }
}

export default OrdersService;
