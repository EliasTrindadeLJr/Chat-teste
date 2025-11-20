import { createServer } from 'http';
import OrdersSocket from './modules/websocket/orders.socket.js';
require('dotenv').config()
import 'reflect-metadata';
import Websocket from './modules/websocket/websocket'; 

import {
   createExpressServer,
   RoutingControllersOptions
} from 'routing-controllers'

const port = process.env.APP_PORT || 3000;

const routingControllerOptions: RoutingControllersOptions = {
   routePrefix: 'v1',
   controllers: [`${__dirname}/modules/**/**/*.controller.{ts,js}`],
   validation: true,
   classTransformer: true,
   cors: true,
   defaultErrorHandler: true
}

const app = createExpressServer(routingControllerOptions);

const httpServer = createServer(app);
const io = Websocket.getInstance(httpServer);

io.initializeHandles([
    {path: '/chat', handler: new OrdersSocket()}
])

httpServer.listen(port, () => {
   console.log(`This is working in port ${port}`);
});


