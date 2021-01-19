import { StyleSheet } from 'react-native';
import { colors } from '../../../Colors/colors';

const styles = StyleSheet.create({
    feedImage: {
        height: 400,
    },
    title: {
        marginTop:5,
        marginHorizontal:8,
        fontSize: 17,
        fontFamily: 'OpenSans-SemiBold',
        color: '#2f3640'
    },
    date: {
        marginVertical:4,
        marginHorizontal:8,
        fontSize: 13,
        color: 'grey',
        fontFamily: 'OpenSans-Regular',
    },
    content: {
        marginHorizontal:8,
        fontFamily: 'Roboto-Light',
        fontSize: 17,
        color: '#000',
        opacity: 8,
        lineHeight: 28
    },
    divider: {
        backgroundColor: '#40739e',
        height: 0.4,
        marginTop: 15
    },
    Container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    modalView: {
        flexGrow: 1,
        paddingBottom:10
    },
    modalContainer: {
        flex: 1,
        marginTop:30
    }
})

export default styles;