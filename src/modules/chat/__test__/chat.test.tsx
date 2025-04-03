import { describe, expect, it } from '@jest/globals';
import { chatService } from '../entities/ChatService';
import { ICustomMessage } from '../entities/ICustomMessage';

describe('chat', () => {
    it('get chat', async () => {
        const res = await chatService.getChat();
        expect(res).toEqual({ isError: false });
    });
    it('create chat', async () => {
        const res = await chatService.createChat();
        expect(res).toEqual({ isError: false });
    });
    it('get messages', async () => {
        const res = await chatService.getMessages();
        expect(res).toEqual({ isError: false });
    });
    it('send messages', async () => {
        const res = await chatService.sendMessages([{
            text: 'string',
            _id: 'id',
            user: { _id: 0 }
        } as ICustomMessage]);
        expect(res).toEqual({ isError: false });
    });
});