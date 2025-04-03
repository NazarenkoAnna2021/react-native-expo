import { describe, expect, it } from '@jest/globals';
import { authService } from '../entities/AuthService';

describe('authentication', () => {
    it('successful signin', async () => {
        const value = {
            email: 'test@test.com',
            password: 'Password1!'
        };
        const res = await authService.signInWithPassword(value);
        expect(res).toEqual({ isError: false });
    });
    it('incorrect signin payload', async () => {
        const value = {
            email: 'test@test.com',
            password: 'Password'
        };
        const res = await authService.signInWithPassword(value);
        expect(res).toEqual({ isError: true, message: 'some error text' });
    });
    it('successful signup', async () => {
        const value = {
            email: 'test1@test.com',
            password: 'Password1!'
        };
        const res = await authService.signUp(value);
        expect(res).toEqual({ isError: false });
    });
    it('incorrect signup payload', async () => {
        const value = {
            email: 'test@test.com',
            password: 'Password1!'
        };
        const res = await authService.signUp(value);
        expect(res).toEqual({ isError: true, message: 'some error text' });
    });
});