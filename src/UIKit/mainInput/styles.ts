import { StyleSheet } from "react-native";
import { IColors } from "../../UIProvider/theme/IColors";
import { scaleHorizontal, scaleVertical, scaleFontSize } from "../../Utils";

export const getStyles = (colors: IColors) => (StyleSheet.create(
    {
        container_main: {
        },
        container_password: {
        },
        inputWrapper: {
            justifyContent: 'center',
            backgroundColor: colors.card,
            borderRadius: scaleHorizontal(6),
        },
        input_main: {
            height: scaleVertical(50),
            fontSize: scaleFontSize(14),
            color: colors.text,
            paddingHorizontal: scaleHorizontal(9),
            borderWidth: scaleVertical(2),
            borderColor: colors.border,
            borderRadius: scaleHorizontal(6),
        },
        input_password: {
            height: scaleVertical(50),
            fontSize: scaleFontSize(14),
            color: colors.text,
            paddingHorizontal: scaleHorizontal(9),
            borderWidth: scaleVertical(2),
            paddingRight: scaleHorizontal(48),
            borderColor: colors.border,
            borderRadius: scaleHorizontal(6),
        },
        errorText: {
            fontSize: scaleFontSize(12),
            color: colors.error,
            marginTop: scaleVertical(4)
        },
        secureTextButton: {
            position: 'absolute',
            right: scaleHorizontal(16)
        },
        placeholder: {
            position: 'absolute',
            fontSize: scaleFontSize(14),
            color: colors.text,
            paddingHorizontal: scaleHorizontal(10),
            overflow: 'visible',
        },
    }

));