import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from 'react';
import { userModel } from "../../../entities/user/UserModel";

export const useLaunchApp = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        setTimeout(() => {
            if (userModel.access_token) {
                navigation.reset({ routes: [{ name: 'TabNavigator' }] });
                return;
            };
            navigation.reset({ routes: [{ name: 'AuthView' }] });
        }, 2000);
    }, []);

    return {};
};