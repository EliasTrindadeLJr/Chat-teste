import { JsonController,Post,Body } from "routing-controllers";
import ChatService from "../../libs/chat.service.js";


@JsonController('/chat', {transformResponse: true})

class ChatController {
    @Post('/')
    sendMessage(@Body() body:any ) {
        let chatService = new ChatService();
        chatService.sendMessage(body);
        return {status: 200, sucess: true};
    }
}

export default ChatController;