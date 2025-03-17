import { userModel } from '../../entities/user/UserModel'
import { IClient, supabase } from './supabase'

class User {

    constructor(private _client: IClient) {
    };

    getProfile = async () => {
        try {
            const response = await this?._client
                ?.from('profiles')
                ?.select(`username, website, avatar_url`)
                ?.eq('id', userModel.user?.id)
                ?.single();
            if (response?.error) {
                return { isError: true, message: response.error.message }
            };
            return { isError: false, data: response?.data };
        } catch (error: any) {
            console.log('Supabase -> getProfile: ', JSON.stringify(error, null, ' '));
            return { isError: true, message: error?.message }
        };
    }
};

export const user = new User(supabase.client);