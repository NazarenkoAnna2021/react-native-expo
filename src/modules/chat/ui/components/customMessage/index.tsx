import { FC, memo, useMemo } from "react";
import { MessageProps, Time } from "react-native-gifted-chat";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { useUiContext } from "../../../../../UIProvider";
import { getStyles } from "./styles";
import { ICustomMessage } from "../../../entities/ICustomMessage";
import { RepliedMessage } from "../repliedMessage";

interface IProps extends MessageProps<ICustomMessage> {
    onNavigate?: (itemId: string | null) => void;
    onSelectMessage?: (value: ICustomMessage) => void;
};

export const CustomMessage: FC<IProps> = memo(({ currentMessage, position, onNavigate, onSelectMessage }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    const handleOnNavigate = () => {
        onNavigate?.(currentMessage?.replied_id)
    };

    const handleOnSelectMessage = () => {
        onSelectMessage?.(currentMessage)
    };

    return (
        <TouchableWithoutFeedback onPress={handleOnNavigate} onLongPress={handleOnSelectMessage}>
            <View style={styles[`container_${position}`]}>
                {!!currentMessage.replied_text && <RepliedMessage position={position} text={currentMessage.replied_text} />}
                <Text style={styles[`text_${position}`]}>{currentMessage.text}</Text>
                <Time timeTextStyle={{ left: styles.time_text_left, right: styles.time_text_right }} currentMessage={currentMessage} position={position} />
            </View>
        </TouchableWithoutFeedback>
    )
})