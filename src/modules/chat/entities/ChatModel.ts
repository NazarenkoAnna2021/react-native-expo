import { create } from "zustand";
import { IChat } from "./IChat";
import { ICustomMessage } from "./ICustomMessage";
import { IStorage, storage } from "../../../libs/storage";

interface IChatModel {
    messages: ICustomMessage[];
    chat: IChat | null
    selectedMessage: ICustomMessage | null;
    lastNotificationId: string;
};

class ChatModel implements IChatModel {
    private repository = create<IChatModel>(() => ({
        messages: [],
        chat: null,
        selectedMessage: null,
        lastNotificationId: ''
    }));

    constructor(private storage: IStorage) {
        this.load();
    }

    private persistLastNotificationId = (data: string) => {
        if (data.length) {
            this.storage.set('LAST_NOTIFICATION_ID', data);
        } else {
            this.storage.remove('LAST_NOTIFICATION_ID');
        }
    }

    private load = () => {
        this.storage.get('LAST_NOTIFICATION_ID')
            .then(lastNotificationId => { lastNotificationId?.length && this.repository.setState({ lastNotificationId }) })
            .catch(error => console.warn('ChatModel -> load: ', error));
    }

    public get use() {
        return this.repository;
    }

    public get messages() {
        return this.repository.getState().messages;
    }

    public set messages(value: ICustomMessage[]) {
        this.repository.setState({ messages: value });
    }

    public get chat() {
        return this.repository.getState().chat;
    }

    public set chat(value: IChat | null) {
        this.repository.setState({ chat: value });
    }

    public get selectedMessage() {
        return this.repository.getState().selectedMessage;
    }

    public set selectedMessage(value: ICustomMessage | null) {
        this.repository.setState({ selectedMessage: value });
    }

    public get lastNotificationId() {
        return this.repository.getState().lastNotificationId;
    }

    public set lastNotificationId(value: string) {
        this.repository.setState({ lastNotificationId: value });
        this.persistLastNotificationId(value);
    }

    public clear = () => {
        this.chat = null;
        this.messages = [];
        this.selectedMessage = null;
    }
};

export const chatModel = new ChatModel(storage);