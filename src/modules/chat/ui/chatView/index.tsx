import { FC, useCallback, useEffect, useMemo } from "react";
import { ScreenContainer } from "../../../../UIKit/screenContainer";
import { MainHeader } from "../../../../UIKit/mainHeader";
import { profilesModel } from "../../../home/entities/profilesModel";
import { useUiContext } from "../../../../UIProvider";
import { chatService } from "../../entities/ChatService";
import { chatModel } from "../../entities/ChatModel";
import { GiftedChat, InputToolbarProps, MessageProps } from "react-native-gifted-chat";
import { userModel } from "../../../../entities/user/UserModel";
import { CustomInputToolbar } from "../components/customInputToolbar";
import { CustomMessage } from "../components/customMessage";
import { ICustomMessage } from "../../entities/ICustomMessage";
import { useKeyboard } from "../../../../hooks/useKeyboard";
import { useNavigation } from "@react-navigation/native";

export const ChatView: FC = () => {
    const { t } = useUiContext();
    const navigation = useNavigation();
    const { selectedProfile } = profilesModel.use();
    const { profile } = userModel.use();
    const { messages, selectedMessage } = chatModel.use();
    const { isFocused } = useKeyboard();
    const user = useMemo(() => ({ _id: profile?.id || '' }), [profile]);

    useEffect(() => {
        setupChat();
        return () => {
            chatService.unsubscribe();
        };
    }, []);

    const setupChat = async () => {
        await chatService.getChat()
        await chatService.getMessages();
        chatService.subscribe();
    };

    const onSend = (value: ICustomMessage[]) => {
        chatService.sendMessages(value);
    };

    const onSelectMessage = (message: ICustomMessage) => {
        chatModel.selectedMessage = message;
    };

    const onDeleteSelection = () => {
        chatModel.selectedMessage = null;
    };

    const renderInputToolbar = useCallback((props: InputToolbarProps<ICustomMessage>) => <CustomInputToolbar isFocused={isFocused} selectedMessage={selectedMessage} onDeleteSelection={onDeleteSelection} {...props} />, [selectedMessage, isFocused]);
    const renderMessage = useCallback((props: MessageProps<ICustomMessage>) => (<CustomMessage onSelectMessage={onSelectMessage} {...props} />), [])

    return (
        <ScreenContainer headerComponent={<MainHeader onGoBack={navigation.goBack} title={selectedProfile?.username || t('noName')} />}>
            <GiftedChat<ICustomMessage>
                user={user}
                messages={messages}
                onSend={onSend}
                renderInputToolbar={renderInputToolbar}
                renderMessage={renderMessage}
                focusOnInputWhenOpeningKeyboard
            />
        </ScreenContainer>
    );
};