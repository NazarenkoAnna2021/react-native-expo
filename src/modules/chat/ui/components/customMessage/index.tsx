import { FC, memo, useMemo, useRef } from "react";
import { MessageProps, Time } from "react-native-gifted-chat";
import { Text, TouchableWithoutFeedback, ViewProps, ViewStyle } from "react-native";
import { useUiContext } from "../../../../../UIProvider";
import { getStyles } from "./styles";
import { ICustomMessage } from "../../../entities/ICustomMessage";
import { RepliedMessage } from "../repliedMessage";
import * as Animatable from 'react-native-animatable';

interface IProps extends MessageProps<ICustomMessage> {
    onNavigate?: (itemId: string | null) => void;
    onSelectMessage?: (value: ICustomMessage) => void;
};

export const CustomMessage: FC<IProps> = memo(({ currentMessage, position, onNavigate, onSelectMessage }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const ref = useRef<Animatable.AnimatableComponent<ViewProps, ViewStyle>>();

    const handleOnNavigate = () => {
        onNavigate?.(currentMessage?.replied_id)
    };

    const handleOnSelectMessage = () => {
        ref.current?.animate({
            0: {
                scale: 1
            },
            1: {
                scale: 0.9
            }
        } as any, 100).then(() => {
            ref.current?.animate({
                0: {
                    scale: 0.9
                },
                1: {
                    scale: 1
                }
            } as any, 100)
        });
        onSelectMessage?.(currentMessage)
    };

    return (
        <TouchableWithoutFeedback onPress={handleOnNavigate} onLongPress={handleOnSelectMessage}>
            <Animatable.View ref={ref as any} style={styles[`container_${position}`]}>
                {!!currentMessage.replied_text && <RepliedMessage position={position} text={currentMessage.replied_text} />}
                <Text style={styles[`text_${position}`]}>{currentMessage.text}</Text>
                <Time timeTextStyle={{ left: styles.time_text_left, right: styles.time_text_right }} currentMessage={currentMessage} position={position} />
            </Animatable.View>
        </TouchableWithoutFeedback>
    )
})