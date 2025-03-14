import { FC } from "react";
import { ScreenContainer } from "../../../../UIKit/screenContainer";
import { Text } from "react-native";

export const LoginView: FC = () => {
    return (
        <ScreenContainer edges={['top']}>
            <Text>LOGIN</Text>
        </ScreenContainer>
    )
};