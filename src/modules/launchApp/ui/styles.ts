import { StyleSheet } from 'react-native';
import { IColors } from '../../../UIProvider/theme/IColors';
import { scaleVertical, scaleFontSize } from '../../../Utils';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: scaleFontSize(30),
            color: colors.title,
            marginTop: scaleVertical(255),
            marginBottom: scaleVertical(144),
        },
    });
    return styles;
};