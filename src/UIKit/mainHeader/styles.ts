import { StyleSheet } from "react-native";
import { IColors } from "../../UIProvider/theme/IColors";
import { scaleHorizontal, scaleFontSize, scaleVertical } from "../../Utils";

export const getStyles = (colors: IColors) => (StyleSheet.create(
    {
        container_main: {
            zIndex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: scaleHorizontal(24),
            paddingBottom: scaleVertical(24),
        },
        title_main: {
            flex: 1,
            fontWeight: '600',
            fontSize: scaleFontSize(32),
            color: colors.title,
            textAlign: 'center',
        },
        backButton: {
            width: scaleHorizontal(48),
            height: scaleHorizontal(48),
            borderRadius: 16
        },
    }
));