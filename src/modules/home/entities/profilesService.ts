import { userModel } from "../../../entities/user/UserModel";
import { IClient, supabase } from "../../../libs/supabase/supabase";
import { profilesModel } from "./profilesModel";

class ProfilesService {

    constructor(private _client: IClient) {
    };

    public getProfiles = async () => {
        try {
            const response = await this?._client
                ?.from('profiles')
                ?.select(`username, website, avatar_url, id`)
                ?.neq('id', userModel.profile?.id)
            if (response?.data) {
                profilesModel.profiles = response.data;
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

};

export const profilesService = new ProfilesService(supabase.client);