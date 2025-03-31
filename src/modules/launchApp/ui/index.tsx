import React, { FC, useMemo } from 'react';
import { getStyles } from './styles';
import { useUiContext } from '../../../UIProvider';
import { ScreenContainer } from '../../../UIKit/screenContainer';
import { useLaunchApp } from '../presenters/useLaunchApp';
import { ActivityIndicator } from 'react-native';

export const LaunchAppView: FC = () => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { } = useLaunchApp();

    return (
        <ScreenContainer containerStyle={styles.container}>
            <ActivityIndicator size={'large'} color={colors.primary} />
        </ScreenContainer>
    );
};
