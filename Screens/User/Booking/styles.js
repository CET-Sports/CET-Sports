import { StyleSheet } from 'react-native';
import { colors } from '../../../Colors/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        backgroundColor: colors.primaryColor,
        paddingHorizontal: 35,
        paddingVertical: 13,
        borderRadius: 5,
        marginTop: 10
    },
    txt: {
        color: '#fff',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14
    }
})

export default styles;
