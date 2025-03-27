import { FC, memo, useMemo } from "react";
import { Text, TextStyle, View, ViewProps } from "react-native";
import { getStyles } from "./styles";
import { useUiContext } from "../../UIProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isIOS, scaleVertical } from "../../Utils";
import { MainButton } from "../mainButton";
import { ChevronIcon } from "../../../assets/ChevronIcon";

interface IProps extends ViewProps {
    type?: 'main';
    title?: string;
    LeadingAccessory?: React.ReactNode;
    TrailingAccessory?: React.ReactNode;
    onGoBack?: () => void;
    titleStyle?: TextStyle;
};

export const MainHeader: FC<IProps> = memo(({ type = 'main', title, LeadingAccessory, TrailingAccessory, onGoBack, style, titleStyle, ...props }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const safeAreaInsets = useSafeAreaInsets();

    return (
        <View style={[styles[`container_${type}`], { marginTop: isIOS ? safeAreaInsets.top : scaleVertical(10) }, style]}  {...props}>
            {!!onGoBack && <MainButton onPress={onGoBack} LeadingAccessory={<ChevronIcon position={'LEFT'} />} style={styles.backButton} />}
            {LeadingAccessory}
            <Text numberOfLines={1} style={styles[`title_${type}`]}>{title}</Text>
            {TrailingAccessory}
        </View>
    )
});