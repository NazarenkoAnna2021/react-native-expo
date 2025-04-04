import { create } from "zustand";
import { IProfile } from "../../../entities/user/IProfile";

interface IProfilesModel {
    profiles: IProfile[];
    selectedProfile: IProfile | null
};

class ProfilesModel implements IProfilesModel {
    private repository = create<IProfilesModel>(() => ({
        profiles: [],
        selectedProfile: null
    }));

    public get use() {
        return this.repository;
    }

    public get profiles() {
        return this.repository.getState().profiles
    }

    public set profiles(value: IProfile[]) {
        this.repository.setState({ profiles: value });
    }

    public get selectedProfile() {
        return this.repository.getState().selectedProfile;
    }


    public set selectedProfile(value: IProfile | null) {
        this.repository.setState({ selectedProfile: value });
    }

    public clear = () => {
        this.profiles = [];
        this.selectedProfile = null;
    }
};

export const profilesModel = new ProfilesModel();