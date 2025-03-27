import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { AuthView } from '../../modules/auth/ui/authView';
import { LaunchAppView } from '../../modules/launchApp/ui';
import { HomeView } from '../../modules/home/ui/homeView';

const Stack = createStackNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

export const MainStackNavigator: FC = () => {

    return (
        <Stack.Navigator initialRouteName='LaunchAppView' screenOptions={{ headerShown: false,  cardStyleInterpolator: forFade }} >
            <Stack.Screen name={'LaunchAppView'} component={LaunchAppView} />
            <Stack.Screen name={'AuthView'} component={AuthView} />
            <Stack.Screen name={'HomeView'} component={HomeView} />
        </Stack.Navigator>
    );
};;
