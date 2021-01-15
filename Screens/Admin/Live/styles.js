import { StyleSheet } from 'react-native';
import { colors } from '../../../Colors/colors';

const styles = StyleSheet.create({
    heading: {
        alignSelf: 'center',
        fontSize: 30,
    },
    rtcview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        margin: 5,
    },
    rtc: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    toggleButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    callButtons: {
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonContainer: {
        margin: 5,
    },
    liveBtnContainer:{
        padding:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    rounded:{
        borderRadius:100,
        backgroundColor:'#ecf0f1',
        height:60,
        width:60,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:25
    }
})

export default styles;