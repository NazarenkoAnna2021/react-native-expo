import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyboard = () => {
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        removeKeyboardListeners();
        addKeyboardListeners();
        return () => {
            removeKeyboardListeners();
        };
    }, []);

    const addKeyboardListeners = () => {
        Keyboard.addListener('keyboardWillShow', () => {
            setIsFocused(true)
        });
        Keyboard.addListener('keyboardWillHide', () => {
            setIsFocused(false)
        });
    };
    const removeKeyboardListeners = () => {
        Keyboard.removeAllListeners('keyboardWillShow');
        Keyboard.removeAllListeners('keyboardWillHide');
    };

    return { isFocused };
};