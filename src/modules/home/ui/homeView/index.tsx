import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useUiContext } from '../../../../UIProvider';
import { ScreenContainer } from '../../../../UIKit/screenContainer';
import { getStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainHeader } from '../../../../UIKit/mainHeader';
import { FlatList, Text } from 'react-native';
import { userService } from '../../../../entities/user/UserService';
import { profilesService } from '../../entities/contactsService';
import { profilesModel } from '../../entities/profilesModel';
import { IProfile } from '../../../../entities/user/IProfile';
import { Card } from '../../../../UIKit/card';

export const HomeView: FC = () => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { profiles } = profilesModel.use();

    useEffect(() => {
        userService.getProfile().then(profilesService.getProfiles)
    }, []);

    const onOpenChat = (item: IProfile) => () =>{
        profilesModel.selectedProfile = item;
        navigation.navigate('ChatView');
    }

    const renderItem = useCallback(({ item }: { item: IProfile }) => (
        <Card onPress={onOpenChat(item)} style={styles.card}>
            <Text style={styles.cardText}>{item.username || t('noName')}</Text>
        </Card>
    ), []);

        return (
            <ScreenContainer containerStyle={styles.container} headerComponent={<MainHeader title={t('home')} />}>
                <FlatList
                    data={profiles}
                    renderItem={renderItem}
                />
            </ScreenContainer>
        );
    };
