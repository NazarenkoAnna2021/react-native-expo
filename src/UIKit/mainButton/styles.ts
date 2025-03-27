import { StyleSheet } from "react-native";
import { IColors } from "../../UIProvider/theme/IColors";
import { scaleHorizontal, scaleVertical, scaleFontSize } from "../../Utils";

export const getStyles = (colors: IColors) => (StyleSheet.create(
    {
        container_main: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: scaleVertical(48),
            borderRadius: 100,
            borderWidth: scaleVertical(2),
            borderBottomWidth: scaleVertical(5),
            borderColor: colors.border,
        },
        container_no_background: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: scaleVertical(41),
        },
        container_with_icon: {
            flexDirection: 'row',
            alignItems: 'center',
            height: scaleVertical(48),
            borderRadius: 100,
            borderWidth: scaleVertical(2),
            borderBottomWidth: scaleVertical(5),
            borderColor: colors.text,
            paddingHorizontal: scaleHorizontal(60),
        },
        title_main: {
            fontSize: scaleFontSize(14),
            fontWeight: '700',
        },
        title_no_background: {
            fontSize: scaleFontSize(14),
            fontWeight: '700',
        },
        title_with_icon: {
            fontSize: scaleFontSize(14),
            fontWeight: '700',
            marginLeft: scaleHorizontal(16),
            textAlign: 'justify',
        },
    }
));