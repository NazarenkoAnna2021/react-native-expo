import { FC } from 'react';
import { UIProvider } from './UIProvider';
import { RootNavigator } from './navigation/rootNavigator';
import { supabase } from './libs/supabase/supabase';
import { notificationsService } from './libs/notifications';
import { chatModel } from './modules/chat/entities/ChatModel';
supabase;
notificationsService;
chatModel;

export const App: FC = () => {
    
    return (
        <UIProvider>
            <RootNavigator />
        </UIProvider>
    );
}