import React, { FC, useEffect, useMemo, useState } from 'react';
import { useUiContext } from '../../../../UIProvider';
import { ScreenContainer } from '../../../../UIKit/screenContainer';
import { View, Text } from 'react-native';
import { getStyles } from './styles';
import { MainButton } from '../../../../UIKit/mainButton';
import { userModel } from '../../../../entities/user/UserModel';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { userService } from '../../../../entities/user/UserService';
import { MainInput } from '../../../../UIKit/mainInput';
import { MainHeader } from '../../../../UIKit/mainHeader';

export const ProfilesView: FC = () => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { profile, user } = userModel.use();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        userService.getProfile();
    }, []);

    const updateProfile = async () => {
        setIsLoading(true);
        setMessage('');
        const { isError, message } = await userService.updateProfile();
        if (isError && message) {
            setMessage(message);
        };
        setIsLoading(false);
    };

    return (
        <ScreenContainer edges={['bottom']} containerStyle={styles.container} headerComponent={<MainHeader title={t('profile')} />}>
            {/* <Animated.View style={[styles.gyroscope, rotationStyle]} /> */}
            <View style={styles.profile}>
                <MainInput
                    placeholder={t('email')}
                    value={user?.email}
                    containerStyle={styles.offset}
                />
                <MainInput
                    placeholder={t('website')}
                    value={profile?.website}
                    onChangeText={(text) => { userModel.profile = { ...profile, website: text } }}
                    containerStyle={styles.offset}
                    autoCapitalize={'none'}
                />
                <MainInput
                    placeholder={t('username')}
                    value={profile?.username}
                    onChangeText={(text) => { userModel.profile = { ...profile, username: text } }}
                    containerStyle={styles.offset}
                />
                {<Text style={styles.error}>{message}</Text>}
                <MainButton
                    isLoading={isLoading}
                    title={t('update')}
                    style={styles.updateButton}
                    onPress={updateProfile}
                />
            </View>
            <MainButton
                title='LOG OUT'
                style={styles.offset}
                onPress={() => {
                    userModel.clear();
                    navigation.reset({ routes: [{ name: 'AuthView' }] });
                }}
            />
        </ScreenContainer>
    );
};
