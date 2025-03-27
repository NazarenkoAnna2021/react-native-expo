import { FC } from 'react';
import { UIProvider } from './UIProvider';
import { RootNavigator } from './navigation/rootNavigator';
import { supabase } from './libs/supabase/supabase';

export const App: FC = () => {
  supabase;

  return (
    <UIProvider>
      <RootNavigator />
    </UIProvider>
  );
}