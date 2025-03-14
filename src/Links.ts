
export interface ILinks {
};

class Links implements ILinks {
    private _domain = 'https://sflbiedaokherqlfrheq.supabase.co';
    private _links = {
    };

    public get domain() {
        return this._domain;
    }

};

export const links = new Links();