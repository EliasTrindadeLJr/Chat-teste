import exp from "constants";
import Websocket from "../modules/websocket/websocket";

class ChatService {
    
    sendMessage(message){
        const io = Websocket.getInstance();
        io.of('/chat').emit('new_message', message);
    }
}

export default ChatService;