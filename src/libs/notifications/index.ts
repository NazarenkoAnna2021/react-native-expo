import * as Notifications from "expo-notifications";
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { Alert } from "react-native";
import { supabase } from "../supabase/supabase";
import { userModel } from "../../entities/user/UserModel";
import { isIOS } from "../../Utils";
import { IChat } from "../../modules/chat/entities/IChat";
import { chatModel } from "../../modules/chat/entities/ChatModel";

class NotificationsService {

    constructor() {
        this.setNotificationHandler();
    }

    private setNotificationHandler = () => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });
    }

    private setChannel = () => {
        if (isIOS) {
            return;
        };
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    private getPermissions = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        if (existingStatus !== Notifications.PermissionStatus.GRANTED) {
            const { status } = await Notifications.requestPermissionsAsync();
            return status === Notifications.PermissionStatus.GRANTED;
        };
        return true;
    }

    public saveAccountNotificationsToken = async (token?: string) => {
        try {
            await supabase.client
                ?.from("profiles")
                .update({ expo_push_token: token })
                .eq('id', userModel.profile?.id);
        } catch (error) {
            console.log('NotificationsService -> saveAccountNotificationsToken: ', error);
        };
    }

    public registerForPushNotificationsAsync = async () => {
        try {
            this.setChannel();
            if (!Device.isDevice) {
                Alert.alert('Must use physical device for Push Notifications');
                return;
            };
            const isPermissionGranted = await this.getPermissions();
            if (!isPermissionGranted) {
                return;
            };
            const token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants?.expoConfig?.extra?.eas.projectId,
            });
            console.log('ExpoPushToken: ', token.data);
            await this.saveAccountNotificationsToken(token.data);
        } catch (error) {
            console.log('NotificationsService -> registerForPushNotificationsAsync: ', error);
        };
    }

    public updateLastNotificationId = async () => {
        const response = await Notifications.getLastNotificationResponseAsync();
        if (response?.notification.request.content.data?.id !== chatModel.lastNotificationId) {
            chatModel.chat = response?.notification.request.content.data as IChat;
            chatModel.lastNotificationId = response?.notification.request.content.data?.id;
            return true;
        };
        return false;
    }

};

export const notificationsService = new NotificationsService();