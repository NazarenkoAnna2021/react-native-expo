import React, { memo } from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeView } from '../../modules/home/ui/homeView';
import { ProfilesView } from '../../modules/home/ui/profilesView';

const OPTIONS: BottomTabNavigationOptions = {
    tabBarStyle: {
        height: 80,
        paddingHorizontal: 20,
    },
    headerShown: false,
    tabBarActiveTintColor: '#171930',
    tabBarInactiveTintColor: '#BAC2CB',
    tabBarItemStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingTop: 16,
    },
    freezeOnBlur: true,
};

const Tab = createBottomTabNavigator();

export const TabNavigator = memo(() => {

    return (
        <Tab.Navigator screenOptions={OPTIONS} initialRouteName='HomeView' >
            <Tab.Screen name='HomeView' component={HomeView} />
            <Tab.Screen name='ProfileView' component={ProfilesView} />
        </Tab.Navigator>
    );
});
