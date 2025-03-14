import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { links } from '../../Links'
import { config } from '../../Config'
import { AppState } from 'react-native'


class Supabase {
    private _supabase = createClient(links.domain, config.supabaseAnonKey, {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    })

    constructor() {
        AppState.addEventListener('change', (state) => {
            if (state === 'active') {
                this._supabase.auth.startAutoRefresh();
                return;
            };
            this._supabase.auth.stopAutoRefresh();
        })
    };

}

export const supabase = new Supabase();