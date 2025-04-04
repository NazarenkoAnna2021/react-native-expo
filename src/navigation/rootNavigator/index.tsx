import React, { FC } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useUiContext } from '../../UIProvider';
import { MainStackNavigator } from '../stackNavigator';

export const RootNavigator: FC = () => {
    const { colors, theme } = useUiContext();

    return (
        <NavigationContainer theme={{ colors, dark: theme === 'dark', fonts: DefaultTheme.fonts }}>
            <MainStackNavigator />
        </NavigationContainer>
    );
};