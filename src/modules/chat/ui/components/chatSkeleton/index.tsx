import { FC, memo, useMemo } from "react";
import { View } from "react-native";
import { useUiContext } from "../../../../../UIProvider";
import { getStyles } from "./styles";
import { MessageMock } from "../messageMock";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scaleVertical } from "../../../../../Utils";

const MOCK: { id: number, position: 'left' | 'right' }[] = [
    {
        id: 0,
        position: 'left',
    },
    {
        id: 1,
        position: 'left',
    },
    {
        id: 2,
        position: 'right',
    },
    {
        id: 3,
        position: 'right',
    },
    {
        id: 4,
        position: 'left',
    },
    {
        id: 5,
        position: 'left',
    },
    {
        id: 6,
        position: 'right',
    },
    {
        id: 7,
        position: 'left',
    },
];

export const ChatSkeleton: FC = memo(() => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const safeAreaInsets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            {MOCK.map(item =>
                <MessageMock key={item.id} position={item.position} />
            )}
            <View style={[styles.textInput, {height:scaleVertical(40)+ safeAreaInsets.bottom}]}/>
        </View>
    )
})