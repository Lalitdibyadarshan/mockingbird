import { MessageActions } from "../enums/MessageActions";

export interface MessageInterface {
    type: MessageActions,
    content?: any
}
