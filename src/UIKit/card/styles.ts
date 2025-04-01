import { StyleSheet } from "react-native";
import { IColors } from "../../UIProvider/theme/IColors";
import { scaleHorizontal, scaleFontSize, scaleVertical } from "../../Utils";

export const getStyles = (colors: IColors) => (StyleSheet.create(
    {
        container_main: {
            marginHorizontal: scaleHorizontal(24),
            padding: scaleHorizontal(10),
            backgroundColor: colors.card,
            borderRadius: 8
        },
    }
));