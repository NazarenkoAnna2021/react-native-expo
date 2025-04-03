import { StyleSheet } from "react-native";
import { IColors } from "../../../../../UIProvider/theme/IColors";
import { size } from "../../../../../Utils";

export const getStyles = (colors: IColors) => (StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        overflow:'hidden'
    },
    textInput: {
        width: size.width,
        backgroundColor: colors.card_inactive
    }
}))