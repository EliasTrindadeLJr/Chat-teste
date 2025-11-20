import { JsonController, Post, Body } from "routing-controllers";
import OrdersService from "../../libs/order.service";

@JsonController('/orders', { transformResponse: true })
class OrdersController {

  @Post('/')
  insertOrder(@Body() order: any) {
    const ordersService = OrdersService.getInstance(); // <-- PEGA A MESMA INSTÂNCIA
    ordersService.insertOrder(order);

    return { status: 200, success: true };
  }
}

export default OrdersController;
