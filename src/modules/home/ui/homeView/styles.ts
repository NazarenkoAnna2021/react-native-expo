import { StyleSheet } from 'react-native';
import { IColors } from '../../../../UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleVertical, size } from '../../../../Utils';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        profile: {
            flex: 1,
        },
        offset: {
            marginHorizontal: scaleHorizontal(24),
            marginTop: scaleVertical(16)
        },
        updateButton: {
            marginHorizontal: scaleHorizontal(24),
        },
        text: {
            fontSize: scaleFontSize(30),
            color: colors.title,
            marginTop: scaleVertical(255),
            marginBottom: scaleVertical(144),
        },
        error: {
            color: colors.error,
            height: scaleVertical(20),
            textAlign: 'center',
        },
        gyroscope:{
            position:'absolute',
            alignSelf:'center',
            top:(size.height/2)-30,
            width:100,
            height:100,
            // backgroundColor:colors.primary,
            borderWidth:2,
            borderTopColor:colors.primary
        },
    });
    return styles;
};