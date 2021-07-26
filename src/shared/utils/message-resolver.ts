import { MessageActions } from "../enums/MessageActions";
import { StorageKey } from "../enums/storage-key.enum";
import { MessageInterface } from "../interface/message.interface";
import { ChromeUtils } from "./chrome-utils";

class MessageResolver {

     resolve(message: MessageInterface, sender: any, send: Function) {
        switch(message.type) {
            case MessageActions.RUNTIME_URL:
                send(message.content && ChromeUtils.getRuntimeUrl(message.content));
                break;
            case MessageActions.RELOAD:
                window.location.reload();
                break;
            case MessageActions.FETCH_DATA:
                ChromeUtils.getChromeStorage(StorageKey.EXTENSION_DATA)
                    .then((res) => {
                        send(res)
                    });
                break;
        }
    }
}

export default new MessageResolver();