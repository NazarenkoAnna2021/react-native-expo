import { SensorType, useAnimatedSensor, useAnimatedStyle } from "react-native-reanimated";

export const useRotation = () => {
    const gyroscope = useAnimatedSensor(SensorType.GRAVITY, {interval:20});

    const rotationStyle = useAnimatedStyle(() => ({
        transform: [
            { rotate: (gyroscope.sensor.value.x * -10) + 'deg' },
        ]
    }));
    return { rotationStyle }
};