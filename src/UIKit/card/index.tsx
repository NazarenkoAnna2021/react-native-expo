import { FC, memo, useMemo } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { getStyles } from "./styles";
import { useUiContext } from "../../UIProvider";

interface IProps extends TouchableOpacityProps {
    type?: 'main';
    children?: React.ReactNode;
    onPress?: () => void;
};

export const Card: FC<IProps> = memo(({ type = 'main', children, style, disabled, ...props }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <TouchableOpacity style={[styles[`container_${type}`], style]} disabled={!props.onPress || disabled} {...props} >
            {children}
        </TouchableOpacity>
    )
});