import { StyleSheet } from "react-native";
import { IColors } from "../../../../../UIProvider/theme/IColors";
import { scaleHorizontal, scaleVertical } from "../../../../../Utils";

export const getStyles = (colors: IColors) => (StyleSheet.create({
    container_left: {
        alignSelf: 'flex-start',
        backgroundColor: colors.bubble_left,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        borderBottomEndRadius: 8,
        marginLeft: scaleHorizontal(10),
        marginBottom: scaleVertical(5)
    },
    container_right: {
        alignSelf: 'flex-end',
        backgroundColor: colors.bubble_right,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        borderBottomStartRadius: 8,
        marginRight: scaleHorizontal(10),
        marginBottom: scaleVertical(5)
    },
    text_left: {
        color: colors.text,
        paddingTop: scaleHorizontal(10),
        paddingHorizontal: scaleHorizontal(10),
    },
    text_right: {
        color: colors.text_inverted,
        paddingTop: scaleHorizontal(10),
        paddingHorizontal: scaleHorizontal(10),
    },
    reply_text_left: {
        color: colors.text,
        paddingLeft: scaleHorizontal(10),
        padding: scaleHorizontal(5),
    },
    reply_text_right: {
        color: colors.text_inverted,
        paddingLeft: scaleHorizontal(10),
        padding: scaleHorizontal(5),
    },
    time_text_left: {
        color: colors.text,
        textAlign: 'left',
        marginTop: scaleVertical(5),
    },
    time_text_right: {
        color: colors.text_inverted,
        textAlign: 'right',
        marginTop: scaleVertical(5),
    },
    replyWrapper_left: {
        backgroundColor: colors.reply,
        borderRadius: 4,
        margin: scaleHorizontal(5),
    },
    replyWrapper_right: {
        backgroundColor: colors.reply,
        borderRadius: 4,
        margin: scaleHorizontal(5),
    },
    reply_indicator_left: {
        position: 'absolute',
        width: scaleHorizontal(3),
        height: '100%',
        backgroundColor: colors.border_inactive,
        borderRadius: 4,
    },
    reply_indicator_right: {
        position: 'absolute',
        width: scaleHorizontal(3),
        height: '100%',
        backgroundColor: colors.border,
        borderRadius: 4,
    },
}))