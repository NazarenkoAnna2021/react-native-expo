import { StyleSheet } from 'react-native';
import { IColors } from '../../../../UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleVertical } from '../../../../Utils';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        profile: {
            flex: 1,
        },
        offset: {
            marginHorizontal: scaleHorizontal(24),
            marginTop: scaleVertical(16)
        },
        updateButton: {
            marginHorizontal: scaleHorizontal(24),
        },
        text: {
            fontSize: scaleFontSize(30),
            color: colors.title,
            marginTop: scaleVertical(255),
            marginBottom: scaleVertical(144),
        },
        error: {
            color: colors.error,
            height: scaleVertical(20),
            textAlign: 'center',
        }
    });
    return styles;
};