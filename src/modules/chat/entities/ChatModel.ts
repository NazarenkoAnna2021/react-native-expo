import { create } from "zustand";
import { IChat } from "./IChat";
import { ICustomMessage } from "./ICustomMessage";

interface IChatModel {
    messages: ICustomMessage[];
    chat: IChat | null
    selectedMessage: ICustomMessage | null;
};

class ChatModel implements IChatModel {
    private repository = create<IChatModel>(() => ({
        messages: [],
        chat: null,
        selectedMessage: null
    }));

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

    public clear = () => {
        this.chat = null;
        this.messages = [];
        this.selectedMessage = null;
    }
};

export const chatModel = new ChatModel();