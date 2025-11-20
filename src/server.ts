import { createServer } from 'http';
import OrdersSocket from './modules/websocket/orders.socket.js';
require('dotenv').config()
import 'reflect-metadata';
import Websocket from './modules/websocket/websocket'; 
import ChatSocket from './modules/websocket/chat.socket.js';

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

const chatNamespace = io.of("/chat"); // deve bater com o front
chatNamespace.on("connection", (socket) => {
    const chatHandler = new ChatSocket();
    chatHandler.handleConnection(socket);
});

httpServer.listen(port, () => {
   console.log(`This is working in port ${port}`);
});


