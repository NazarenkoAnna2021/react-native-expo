import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { LoginView } from '../../modules/auth/ui/loginView';

const Stack = createStackNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

export const MainStackNavigator: FC = () => {

    return (
        <Stack.Navigator initialRouteName='LoginView' screenOptions={{ headerShown: false,  cardStyleInterpolator: forFade }} >
            <Stack.Screen name={'LoginView'} component={LoginView} />
        </Stack.Navigator>
    );
};;
