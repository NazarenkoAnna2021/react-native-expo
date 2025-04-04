import { FC, memo, useEffect, useMemo, useRef } from "react";
import { ActivityIndicator, GestureResponderEvent, TextProps, TextStyle, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, ViewProps } from "react-native";
import { getStyles } from "./styles";
import { useUiContext } from "../../UIProvider";
import * as Animatable from 'react-native-animatable';
import { getButtonAnimations } from "./buttonAnimations";

interface IProps extends TouchableWithoutFeedbackProps {
    isLoading?: boolean;
    type?: 'main' | 'no_background' | 'with_icon';
    title?: string;
    LeadingAccessory?: React.ReactNode;
    TrailingAccessory?: React.ReactNode;
    titleStyle?: TextStyle;
};

export const MainButton: FC<IProps> = memo(({ isLoading = false, type = 'main', title, LeadingAccessory, TrailingAccessory, style, titleStyle, ...props }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const buttonAnimations = useMemo(() => getButtonAnimations(colors, type), [colors, type]);
    const isAnimated = useRef(false);
    const viewRef = useRef<Animatable.AnimatableComponent<ViewProps, TextStyle>>();
    const textRef = useRef<Animatable.AnimatableComponent<TextProps, TextStyle>>();

    useEffect(() => {
        if (props.disabled && isAnimated.current) {
            viewRef.current?.animate(buttonAnimations.disabledView, 500);
            textRef.current?.animate(buttonAnimations.disabledText, 500);
        } else if (isAnimated.current) {
            viewRef.current?.animate(buttonAnimations.enabledView, 500);
            textRef.current?.animate(buttonAnimations.enabledText, 500);
        }
        isAnimated.current = true;
    }, [props.disabled]);


    const onPressIn = (event: GestureResponderEvent) => {
        props?.onPressIn?.(event);
        viewRef.current?.animate(buttonAnimations.pressedIn, 100);
        textRef.current?.animate(buttonAnimations.pressedInText, 100);
    };

    const onPressOut = (event: GestureResponderEvent) => {
        props?.onPressOut?.(event);
        viewRef.current?.animate(buttonAnimations.pressedOut, 100);
        textRef.current?.animate(buttonAnimations.pressedOutText, 100);
    };

    return (
        <TouchableWithoutFeedback {...props} onPressIn={onPressIn} onPressOut={onPressOut} onPress={props.onPress}>
            <Animatable.View ref={viewRef as any} style={[styles[`container_${type}`], { backgroundColor: buttonAnimations.buttonColors[type][props.disabled ? 'disabled' : 'default'], borderColor: buttonAnimations.buttonColors[type].border }, style]}>
                {LeadingAccessory}
                {isLoading
                    ? <ActivityIndicator color={buttonAnimations.buttonColors[type].text_active} size={'small'} />
                    : <Animatable.Text ref={textRef as any} style={[styles[`title_${type}`], { color: buttonAnimations.buttonColors[type][props.disabled ? 'text_disabled' : 'text_default'] }, titleStyle]}>{title}</Animatable.Text>}
                {TrailingAccessory}
            </Animatable.View>
        </TouchableWithoutFeedback>
    )
});