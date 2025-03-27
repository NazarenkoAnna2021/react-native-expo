import { userModel } from "../../../entities/user/UserModel";
import { IClient, supabase } from "../../../libs/supabase/supabase";
import { profilesModel } from "../../home/entities/profilesModel";
import { chatModel } from "./ChatModel";
import { RealtimeChannel } from "@supabase/supabase-js";
import { ICustomMessage } from "./ICustomMessage";

class ChatService {
    private _subscription: RealtimeChannel | undefined = undefined

    constructor(private _client: IClient) {

    };

    public createChat = async () => {
        try {
            const response = await this._client
                ?.from('chats')
                ?.insert({ profiles: [userModel.profile?.id, profilesModel.selectedProfile?.id] })
                ?.select()
                ?.single();
            if (response?.data) {
                chatModel.chat = response.data;
            };
            if (response?.error) {
                return { isError: true, message: response.error.message };
            };
            return { isError: false };
        } catch (error: any) {
            console.log('Supabase -> createChat: ', JSON.stringify(error, null, ' '));
            return { isError: true, message: error.message };
        };
    }

    public getChat = async () => {
        try {
            const response = await this?._client
                ?.from('chats')
                ?.select(`*`)
                ?.contains('profiles', [userModel.profile?.id, profilesModel.selectedProfile?.id])
                ?.single();
            if (response?.data) {
                chatModel.chat = response.data;
            };
            if (response?.data?.length === 0) {
                this.createChat();
            };
            if (response?.error) {
                return { isError: true, message: response.error.message };
            };
            return { isError: false };
        } catch (error: any) {
            console.log('Supabase -> getProfile: ', JSON.stringify(error, null, ' '));
            return { isError: true, message: error.message };
        };
    }

    public getMessages = async () => {
        try {
            const response = await this._client
                ?.from('messages')
                ?.select()
                ?.eq('chat_id', chatModel.chat?.id)
            if (response?.data) {
                chatModel.messages = response.data.map(item => ({ ...item, _id: item.id, user: { _id: item.user_id } })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            };
            if (response?.error) {
                return { isError: true, message: response.error.message };
            };
            return { isError: false };
        } catch (error: any) {
            console.log('Supabase -> getMessages: ', JSON.stringify(error, null, ' '));
            return { isError: true, message: error.message };
        };
    }

    public sendMessages = async (messages: ICustomMessage[]) => {
        try {
            const selection = { replied_id: chatModel.selectedMessage?._id, replied_text: chatModel.selectedMessage?.text };
            chatModel.selectedMessage = null;
            const response = await this._client
                ?.from('messages')
                ?.insert(messages.map(item => ({ user_id: userModel.profile?.id, chat_id: chatModel.chat?.id, text: item.text, createdAt: item.createdAt, ...selection })))
                ?.select()
            if (response?.error) {
                return { isError: true, message: response.error.message };
            };
            return { isError: false };
        } catch (error: any) {
            console.log('Supabase -> sendMessages: ', JSON.stringify(error, null, ' '));
            return { isError: true, message: error.message };
        };
    }

    private handleInserts = (payload: any) => {
        chatModel.messages = [...chatModel.messages, { ...payload.new, _id: payload.new.id, user: { _id: payload.new.user_id } }].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    public subscribe = () => {
        this._subscription = this._client
            ?.channel('messages')
            ?.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, this.handleInserts)
            ?.subscribe();
    }

    public unsubscribe = () => {
        this._subscription?.unsubscribe();
    }

};

export const chatService = new ChatService(supabase.client);