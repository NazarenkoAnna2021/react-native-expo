import { FC, memo, useEffect, useMemo, useState } from "react";
import { TextInput, TextInputProps, Text, View, ViewStyle, TouchableOpacity, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { getStyles } from "./styles";
import { useUiContext } from "../../UIProvider";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { scaleFontSize, scaleHorizontal, scaleVertical } from "../../Utils";
import { EyeIcon } from "../../../assets/EyeIcon";

interface IProps extends TextInputProps {
    type?: 'main' | 'password';
    enableErrorMessage?: boolean;
    error?: string;
    LeadingAccessory?: React.ReactNode;
    TrailingAccessory?: React.ReactNode;
    containerStyle?: ViewStyle;
};

export const MainInput: FC<IProps> = memo(({ type = 'main', enableErrorMessage = false, error, LeadingAccessory, TrailingAccessory, containerStyle, secureTextEntry, placeholder, onFocus, onBlur, style, ...props }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [localSecureTextEntry, setLocalSecureTextEntry] = useState(secureTextEntry);
    const placeholderOffset = useSharedValue(props.value?.length ? scaleVertical(10) : scaleVertical(16));
    const placeholderTextSize = useSharedValue(props.value?.length ? scaleFontSize(10) : scaleFontSize(14));
    const derivedTextSize = useDerivedValue(() => placeholderTextSize.value, [placeholderOffset.value]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (isFocused || props.value?.length) {
            placeholderOffset.value !== scaleVertical(10) && (placeholderOffset.value = withTiming(scaleVertical(10), { duration: 300 }));
            placeholderTextSize.value !== scaleFontSize(10) && (placeholderTextSize.value = withTiming(scaleFontSize(10), { duration: 300 }));
        } else if (props.value?.length === 0) {
            placeholderOffset.value !== scaleVertical(16) && (placeholderOffset.value = withTiming(scaleVertical(16), { duration: 300 }));
            placeholderTextSize.value !== scaleFontSize(14) && (placeholderTextSize.value = withTiming(scaleHorizontal(14), { duration: 300 }));
        };
    }, [error, isFocused, props.value]);

    const onSetLocalSecureTextEntry = () => {
        setLocalSecureTextEntry(prev => !prev);
    };

    const placeholderStyle = useAnimatedStyle(() => ({
        top: placeholderOffset.value,
        fontSize: derivedTextSize.value
    }));

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
                <Animated.Text style={[styles.placeholder, placeholderStyle]}>{placeholder}</Animated.Text>
                <TextInput
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