import { StyleSheet } from "react-native";
import { IColors } from "../../../../../UIProvider/theme/IColors";
import { scaleHorizontal } from "../../../../../Utils";

export const getStyles = (colors: IColors) => (StyleSheet.create({
    replyWrapper_left: {
        backgroundColor: colors.reply,
        borderRadius: 4,
        margin: scaleHorizontal(5),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    replyWrapper_right: {
        backgroundColor: colors.reply,
        borderRadius: 4,
        margin: scaleHorizontal(5),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
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
    closeButton:{
        padding:scaleHorizontal(10)
    }
}))