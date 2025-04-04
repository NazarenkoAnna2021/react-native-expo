import { FC, memo, useMemo, useState } from "react";
import { ActivityIndicator, GestureResponderEvent, Text, TextStyle, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, View } from "react-native";
import { getStyles } from "./styles";
import { useUiContext } from "../../UIProvider";

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
    const [status, setStatus] = useState<'active' | 'default'>('default');
    const buttonColors = {
        main: {
            default: colors.primary,
            active: colors.primary_active,
            disabled: colors.inactive,
            text_default: colors.text_inverted,
            text_active: colors.text_inverted,
            text_disabled: colors.text_inverted,
            border: colors.text,
            border_disabled: colors.border_inactive,
        },
        no_background: {
            default: '',
            active: '',
            disabled: '',
            text_default: colors.title,
            text_active: colors.border_inactive,
            text_disabled: colors.inactive,
            border: '',
            border_disabled: '',
        },
        with_icon: {
            default: colors.card,
            active: colors.card_inactive,
            disabled: colors.inactive,
            text_default: colors.title,
            text_active: colors.title,
            text_disabled: colors.title,
            border: colors.text,
            border_disabled: colors.border_inactive,
        },
    };

    const onPressIn = (event: GestureResponderEvent) => {
        setStatus('active');
        props?.onPressIn?.(event);
    };

    const onPressOut = (event: GestureResponderEvent) => {
        setStatus('default');
        props?.onPressOut?.(event);
    };

    return (
        <TouchableWithoutFeedback {...props} onPressIn={onPressIn} onPressOut={onPressOut} onPress={props.onPress}>
            <View style={[styles[`container_${type}`], { backgroundColor: buttonColors[type][props.disabled ? 'disabled' : status], borderColor: buttonColors[type][props.disabled ? 'border_disabled' : 'border'] }, style]}>
                {LeadingAccessory}
                {isLoading
                    ? <ActivityIndicator color={buttonColors[type].text_active} size={'small'} />
                    : <Text style={[styles[`title_${type}`], { color: buttonColors[type][`text_${props.disabled ? 'disabled' : status}`] }, titleStyle]}>{title}</Text>}
                {TrailingAccessory}
            </View>
        </TouchableWithoutFeedback>
    )
});