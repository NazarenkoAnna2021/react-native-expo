import { IMessage } from "react-native-gifted-chat";

export interface ICustomMessage extends IMessage {
    chat_id: string;
    replied_text: string | null;
    replied_id: string | null;
};