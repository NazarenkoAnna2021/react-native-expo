import { FC, memo, useEffect, useMemo } from "react";
import { View } from "react-native";
import { useUiContext } from "../../../../../UIProvider";
import { getStyles } from "./styles";
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient';
import { scaleHorizontal } from "../../../../../Utils";

const COORDINATES = {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 }
};

const COLORS: [string, string, ...string[]] = [
    "rgba(255,255,255,0)",
    "rgba(255,255,255,0.1)",
    "rgba(255,255,255,0.4)",
    "rgba(255,255,255,0.6)",
    "rgba(255,255,255,0.7)",
    "rgba(255,255,255,0.6)",
    "rgba(255,255,255,0.4)",
    "rgba(255,255,255,0.1)",
    "rgba(255,255,255,0)"
];

interface IProps {
    position: 'left' | 'right';
};

export const MessageMock: FC<IProps> = memo(({ position }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const translateX = useSharedValue(0);

    useEffect(() => {
        animateAcrossXDirection();
        return () => {
            cancelAnimation(translateX);
        };
    }, []);

    const animateAcrossXDirection = () => {
        const overflowOffset = scaleHorizontal(200) * 0.75;
        const leftMostEnd = -overflowOffset;
        translateX.value = leftMostEnd
        translateX.value = withRepeat(withDelay(800, withTiming(scaleHorizontal(400), { duration: 1000, easing: Easing.linear, })), -1);
    };

    const animatedStyleX = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
            ],
        };
    });

    return (
        <View style={styles[`container_${position}`]} >
            <Animated.View style={[styles.shiver, animatedStyleX]} >
                <LinearGradient
                    colors={COLORS}
                    style={styles.gradient}
                    start={COORDINATES.start}
                    end={COORDINATES.end}
                />
            </Animated.View>
            <View style={styles[`text_${position}`]} />
            <View style={styles[`text_${position}`]} />
            <View style={styles[`time_text_${position}`]} />
        </View>
    )
})