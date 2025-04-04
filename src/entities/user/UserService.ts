import { userModel } from '../../entities/user/UserModel'
import { IClient, supabase } from '../../libs/supabase/supabase';

class UserService {

    constructor(private _client: IClient) {
    };

    public getProfile = async () => {
        try {
            const response = await this?._client
                ?.from('profiles')
                ?.select(`username, website, avatar_url, id`)
                ?.eq('id', userModel.user?.id)
                ?.single();
            if (response?.data) {
                userModel.profile = response.data;
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

    public updateProfile = async () => {
        const response = await this._client?.from('profiles').upsert({ id: userModel.user?.id, ...userModel.profile });
        if (response?.error) {
            return { isError: true, message: response.error.message };
        };
        return { isError: false };
    }

};

export const userService = new UserService(supabase.client);