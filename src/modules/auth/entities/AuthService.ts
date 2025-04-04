import { AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js'
import { userModel } from '../../../entities/user/UserModel';
import { IClient, supabase } from '../../../libs/supabase/supabase';

class AuthService {

    constructor(private _client: IClient) {}

    private processAuthResponse = (response?: AuthTokenResponsePassword | AuthResponse) => {
        if (!response?.data.session || !response.data.user || response.error) {
            return { isError: true, message: response?.error?.message };
        };
        userModel.access_token = response.data.session.access_token;
        userModel.user = response.data.user;
        return { isError: false };
    };

    public signInWithPassword = async (value: { email: string, password: string }) => {
        try {
            const response: AuthTokenResponsePassword | undefined = await this._client?.auth.signInWithPassword(value);
            return this.processAuthResponse(response)
        } catch (error: any) {
            console.log('Supabase -> signInWithPassword: ', JSON.stringify(error, null, ' '));
            return { isError: true, message: error?.message };
        };
    }

    public signUp = async (value: { email: string, password: string }) => {
        try {
            const response: AuthResponse | undefined = await this._client?.auth.signUp(value);
            return this.processAuthResponse(response);
        } catch (error: any) {
            console.log('Supabase -> signInWithPassword: ', JSON.stringify(error));
            return { isError: true, message: error?.message };
        };
    }

};

export const authService = new AuthService(supabase.client);