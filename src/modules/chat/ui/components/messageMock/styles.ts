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
        marginBottom: scaleVertical(5),
        height: scaleVertical(90),
        width: scaleHorizontal(200),
        overflow: 'hidden',
    },
    container_right: {
        alignSelf: 'flex-end',
        backgroundColor: colors.bubble_left,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        borderBottomStartRadius: 8,
        marginRight: scaleHorizontal(10),
        marginBottom: scaleVertical(5),
        height: scaleVertical(90),
        width: scaleHorizontal(200),
        overflow: 'hidden',
    },
    text_left: {
        opacity: 0.4,
        backgroundColor: colors.card,
        marginTop: scaleHorizontal(10),
        marginHorizontal: scaleHorizontal(10),
        width: scaleHorizontal(180),
        height: scaleVertical(20)
    },
    text_right: {
        opacity: 0.4,
        backgroundColor: colors.card,
        marginTop: scaleHorizontal(10),
        marginHorizontal: scaleHorizontal(10),
        width: scaleHorizontal(180),
        height: scaleVertical(20)
    },
    time_text_left: {
        opacity: 0.4,
        backgroundColor: colors.card,
        margin: scaleVertical(10),
        width: scaleHorizontal(20),
        height: scaleVertical(10)
    },
    time_text_right: {
        opacity: 0.4,
        backgroundColor: colors.card,
        alignSelf: 'flex-end',
        margin: scaleVertical(10),
        width: scaleHorizontal(20),
        height: scaleVertical(10)
    },
    shiver: {
        height: "100%",
        width: "70%",
        position: 'absolute',
    },
    gradient: {
        height: "100%",
        width: "100%",
    }
}))