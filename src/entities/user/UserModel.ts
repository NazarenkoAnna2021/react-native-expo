import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { IStorage, storage } from "../../libs/storage";
import { IProfile } from "./IProfile";

interface IUserModel {
    user: User | null;
    access_token: string | null;
    profile: IProfile | null;
};

class UserModel implements IUserModel {
    private repository = create<IUserModel>(() => ({
        user: null,
        access_token: null,
        profile: null
    }));

    constructor(private storage: IStorage) {
        this.loadUser();
    }

    private persistToken = (data: string | null) => {
        if (data) {
            this.storage.set('STORAGE_TOKEN', data);
        } else {
            this.storage.remove('STORAGE_TOKEN');
        }
    }

    private persistUser = (data: User | null) => {
        if (data) {
            this.storage.set('STORAGE_USER', data);
        } else {
            this.storage.remove('STORAGE_USER');
        }
    }

    private loadUser = () => {
        this.storage.get('STORAGE_USER')
            .then(user => { user && this.repository.setState({ user }); })
            .catch(error => console.warn('UserModel -> loadUser: ', error));
        this.storage.get('STORAGE_TOKEN')
            .then(access_token => { access_token && this.repository.setState({ access_token }); })
            .catch(error => console.warn('UserModel -> loadUser: ', error));
    }

    public get useUser(){
        return this.repository;
    }

    public get user() {
        return this.repository.getState().user
    }

    public set user(value: User | null) {
        this.repository.setState({ user: value });
        this.persistUser(value);
    }

    public get access_token() {
        return this.repository.getState().access_token;
    }

    public set access_token(value: string | null) {
        this.repository.setState({ access_token: value });
        this.persistToken(value);
    }

    public get profile() {
        return this.repository.getState().profile;
    }


    public set profile(value: IProfile | null) {
        this.repository.setState({ profile: value });
    }

    public clear = () => {
        this.access_token = null;
        this.user = null;
        this.profile = null;
    }
};

export const userModel = new UserModel(storage);