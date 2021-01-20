import { StyleSheet } from 'react-native';
import { colors } from '../../../Colors/colors';

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: 'OpenSans-SemiBold',
        color: '#2f3640'
    },
    date: {
        marginTop:5,
        fontSize: 13,
        color: 'grey',
        fontFamily: 'OpenSans-Regular',
    },
    content: {
        marginTop:2,
        fontFamily: 'Roboto-Light',
        fontSize: 17,
        color: '#000',
        opacity: 8,
        lineHeight: 28
    },
    flatlist:{
        marginHorizontal:15,
        marginTop:10
    },
    divider: {
        backgroundColor: '#40739e',
        height: 0.4,
        marginTop: 15
    },
    tView:{
        display:'flex',
        flexDirection:'row'
    }
})

export default styles;