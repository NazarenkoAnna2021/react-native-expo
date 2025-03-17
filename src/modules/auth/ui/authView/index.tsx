import { FC, useMemo, useState } from "react";
import { ScreenContainer } from "../../../../UIKit/screenContainer";
import { MainInput } from "../../../../UIKit/mainInput";
import { MainButton } from "../../../../UIKit/mainButton";
import { useUiContext } from "../../../../UIProvider";
import { getStyles } from "./styles";
import { MainHeader } from "../../../../UIKit/mainHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "react-native";
import { authService } from "../../entities/AuthService";

export const AuthView: FC = () => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const signInWithEmail = async () => {
        setLoading(true)
        setMessage('');
        const { isError, message } = await authService.signInWithPassword({ email, password });
        if (!isError) {
            navigation.navigate('HomeView');
        };
        if (message) {
            setMessage(message);
        };
        setLoading(false);
    };

    const signUpWithEmail = async () => {
        setLoading(true)
        setMessage('');
        const { isError, message } = await authService.signUp({ email, password });
        if (!isError) {
            navigation.navigate('HomeView');
        };
        if (message) {
            setMessage(message);
        };
        setLoading(false);
    };

    return (
        <ScreenContainer edges={['top']} containerStyle={styles.container} headerComponent={<MainHeader title={t('authentication')} />}>
            <MainInput
                onChangeText={setEmail}
                placeholder={t('email')}
                autoCapitalize={'none'}
                value={email}
                containerStyle={styles.offset}
                error={message}
            />
            <MainInput
                type={'password'}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                placeholder={t('password')}
                autoCapitalize={'none'}
                containerStyle={styles.offset}
                error={message}
            />
            <Text style={styles.error}>{message}</Text>
            <MainButton isLoading={loading} onPress={signInWithEmail} title={t('logIn')} style={styles.offset} />
            <MainButton isLoading={loading} onPress={signUpWithEmail} title={t('signIn')} style={styles.offset} />
        </ScreenContainer >
    )
};