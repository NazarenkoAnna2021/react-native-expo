import { FC } from 'react';
import { UIProvider } from './UIProvider';
import { RootNavigator } from './navigation/rootNavigator';
import { supabase } from './libs/supabase/supabase';
import { notificationsService } from './libs/notifications';

export const App: FC = () => {
    supabase;
    notificationsService;

    return (
        <UIProvider>
            <RootNavigator />
        </UIProvider>
    );
}