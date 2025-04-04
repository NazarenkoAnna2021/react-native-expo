import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import { getStyles } from "./styles";
import { useUiContext } from "../../UIProvider";
import { scaleFontSize, scaleVertical } from "../../Utils";
import { EyeIcon } from "../../../assets/EyeIcon";
import * as Animatable from 'react-native-animatable';
import { TextInputProps, Text, ViewStyle, NativeSyntheticEvent, TextInputFocusEventData, TextInput, TouchableOpacity, TextProps, TextStyle, View } from "react-native";

const PLACEHOLDER_DOWN = {
    0: {
        top: scaleVertical(10),
        fontSize: scaleFontSize(10)
    },
    1: {
        top: scaleVertical(16),
        fontSize: scaleFontSize(14)
    }
};
const PLACEHOLDER_UP = {
    0: {
        top: scaleVertical(16),
        fontSize: scaleFontSize(14)
    },
    1: {
        top: scaleVertical(10),
        fontSize: scaleFontSize(10)
    }

};

interface IProps extends TextInputProps {
    ID?: string;
    type?: 'main' | 'password';
    enableErrorMessage?: boolean;
    error?: string;
    LeadingAccessory?: React.ReactNode;
    TrailingAccessory?: React.ReactNode;
    containerStyle?: ViewStyle;
};

export const MainInput: FC<IProps> = memo(({ ID, type = 'main', enableErrorMessage = false, error, LeadingAccessory, TrailingAccessory, containerStyle, secureTextEntry, placeholder, onFocus, onBlur, style, ...props }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [localSecureTextEntry, setLocalSecureTextEntry] = useState(secureTextEntry);
    const [isFocused, setIsFocused] = useState(false);

    const onSetLocalSecureTextEntry = () => {
        setLocalSecureTextEntry(prev => !prev);
    };

    const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        onFocus?.(e);
    };
    const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    return (
        <View style={[styles[`container_${type}`], containerStyle]}>
            <View style={[styles.inputWrapper]}>
                <AnimatedText isUp={isFocused || props.value?.length !== 0} placeholder={placeholder} />
                <TextInput
                    testID={ID}
                    {...props}
                    style={[styles[`input_${type}`], { borderColor: error?.length && !isFocused ? colors.error : colors.border, paddingTop: placeholder ? scaleVertical(11) : 0 }, style]}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    secureTextEntry={localSecureTextEntry}
                    selectionColor={colors.primary}
                />
                {type === 'password' &&
                    <TouchableOpacity style={styles.secureTextButton} onPress={onSetLocalSecureTextEntry}>
                        <EyeIcon isCrossed={localSecureTextEntry} />
                    </TouchableOpacity>
                }
            </View>
            {enableErrorMessage && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
});

const AnimatedText: FC<{ isUp: boolean, placeholder?: string }> = memo(({ isUp, placeholder }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const ref = useRef<Animatable.AnimatableComponent<TextProps, TextStyle>>();
    const isAnimated = useRef(false);
    const initialStyle = isUp ? PLACEHOLDER_UP[1] : PLACEHOLDER_UP[0];

    useEffect(() => {
        if (isUp && isAnimated.current) {
            ref.current?.animate(PLACEHOLDER_UP, 300);
        } else if (isAnimated.current) {
            ref.current?.animate(PLACEHOLDER_DOWN, 300);
        };
        isAnimated.current = true;
    }, [isUp]);

    return (
        <Animatable.Text ref={ref as any} style={[styles.placeholder, initialStyle]}>{placeholder}</Animatable.Text>
    );
});