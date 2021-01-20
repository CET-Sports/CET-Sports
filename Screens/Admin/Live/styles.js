import { StyleSheet } from 'react-native';
import { colors } from '../../../Colors/colors';

const styles = StyleSheet.create({
    modalText: {
        color: '#000',
        fontFamily: 'OpenSans-SemiBold',
        fontSize:14
    },
    heading: {
        alignSelf: 'center',
        fontSize: 30,
    },
    rtcview: {
        flex: 1
    },
    rtc: {
        backgroundColor:'#fff',
        flex: 1,
        width: '100%',
        height: '100%'
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
    liveBtnContainer: {
        paddingVertical: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rounded: {
        borderRadius: 100,
        backgroundColor: '#ecf0f1',
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 25
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        height: 50,
        width: 50
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
    },
    modalView: {
        justifyContent: 'center',
        borderRadius: 4,
        marginHorizontal: 20,
        display: 'flex',
        flexDirection: 'column',
        height: 320,
        backgroundColor: "red",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 100,
        elevation: 100,
        padding: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#FAFAFA'
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'rgba(52,52,52,0.3)'
    },
    textInput: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#000',
        marginVertical: 5
    },
})

export default styles;