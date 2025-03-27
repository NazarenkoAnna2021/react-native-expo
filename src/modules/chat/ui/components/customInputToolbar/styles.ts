import { StyleSheet } from "react-native";
import { IColors } from "../../../../../UIProvider/theme/IColors";
import { scaleHorizontal, scaleVertical } from "../../../../../Utils";

export const getStyles = (colors: IColors) => (StyleSheet.create({
    container: {
        backgroundColor: colors.card_inactive,
        paddingTop: scaleVertical(10),
    },
    textInputStyle: {
        backgroundColor: colors.card,
        marginLeft: scaleHorizontal(20),
        width: scaleHorizontal(300),
        height: scaleVertical(40),
        borderRadius: 8
    },
    sendContainer: {
        backgroundColor: colors.card
    },
    inputToolbar: {
        backgroundColor: 'transparent',
        borderTopWidth: 0
    }
}))