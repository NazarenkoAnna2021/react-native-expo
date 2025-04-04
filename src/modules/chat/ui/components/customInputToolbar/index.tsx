import { FC, memo, useMemo } from "react";
import { Composer, IMessage, InputToolbar, InputToolbarProps } from "react-native-gifted-chat";
import { View } from "react-native";
import { useUiContext } from "../../../../../UIProvider";
import { getStyles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RepliedMessage } from "../repliedMessage";
import { isIOS, scaleVertical } from "../../../../../Utils";

interface IProps extends InputToolbarProps<IMessage> {
    isFocused: boolean;
    selectedMessage: IMessage | null;
    onDeleteSelection?: () => void;
};

export const CustomInputToolbar: FC<IProps> = memo(({ isFocused, selectedMessage, onDeleteSelection, ...props }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const safeAreaInsets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: (isFocused || !isIOS) ? scaleVertical(10) : safeAreaInsets.bottom }]}>
            {!!selectedMessage && <RepliedMessage position={'left'} text={selectedMessage.text} onClose={onDeleteSelection} />}
            <InputToolbar
                containerStyle={styles.inputToolbar}
                renderComposer={(props) => <View style={styles.textInputStyle}><Composer {...props} /></View>}
                {...props}
            />
        </View>
    )
})