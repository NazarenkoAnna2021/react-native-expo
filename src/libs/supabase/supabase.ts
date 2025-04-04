import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js'
import { links } from '../../Links'
import { config } from '../../Config'
import { AppState, NativeEventSubscription } from 'react-native';

interface ISupabase {
    client: IClient;
};

export type IClient = SupabaseClient<any, "public", any> | null

class Supabase implements ISupabase {
    private _client: SupabaseClient<any, "public", any> | null = null
    private subscription: NativeEventSubscription | null = null;

    constructor(supabaseUrl: string, supabaseKey: string, options?: SupabaseClientOptions<"public"> | undefined) {
        if (this._client) return;
        this._client = createClient(supabaseUrl, supabaseKey, options);
        this.addListener();
    }

    private addListener = () => {
        if (this.subscription) {
            this.subscription.remove();
        };
        this.subscription = AppState.addEventListener('change', (state) => {
            if (state === 'active') {
                this._client?.auth?.startAutoRefresh?.();
                return;
            };
            this._client?.auth?.stopAutoRefresh?.();
        });
    }

    get client() {
        return this._client;
    }

};

export const supabase = new Supabase(links.domain, config.supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});