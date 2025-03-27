import { FC, memo, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useUiContext } from "../../../../../UIProvider";
import { getStyles } from "./styles";
import { CrossIcon } from "../../../../../../assets/CrossIcon";

interface IProps {
    position: 'left' | 'right';
    text: string;
    onClose?: () => void;
};

export const RepliedMessage: FC<IProps> = memo(({ position, text, onClose }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <View style={styles[`replyWrapper_${position}`]}>
            <View style={styles[`reply_indicator_${position}`]} />
            <Text style={styles[`reply_text_${position}`]}>{text}</Text>
            {!!onClose &&
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <CrossIcon color={colors.text} />
                </TouchableOpacity>
            }
        </View>
    )
})