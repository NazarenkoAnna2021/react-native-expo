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
            height: scaleHorizontal(48),
        },
        title_main: {
            width: '100%',
            position: 'absolute',
            fontWeight: '600',
            fontSize: scaleFontSize(32),
            color: colors.title,
            textAlign: 'center',
        },
        backButton: {
            zIndex: 1,
            justifyContent: 'center',
            height: scaleHorizontal(48),
            paddingHorizontal: scaleHorizontal(24),
            borderRadius: 16
        },
    }
));