import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { UIProvider } from './UIProvider';
import { RootNavigator } from './navigation/rootNavigator';

export const App: FC = () => {
  return (
    <UIProvider>
      <RootNavigator />
    </UIProvider>
  );
}