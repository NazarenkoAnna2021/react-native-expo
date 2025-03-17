import { StyleSheet } from "react-native";
import { IColors } from "../../../../UIProvider/theme/IColors";
import { scaleHorizontal, scaleVertical } from "../../../../Utils";

export const getStyles = (colors: IColors) => (StyleSheet.create({
    container: {
        paddingHorizontal: scaleHorizontal(24),
    },
    offset: {
        marginBottom: scaleVertical(10)
    },
    error: {
        color: colors.error,
        height:scaleVertical(20),
        textAlign:'center',
    }
}))