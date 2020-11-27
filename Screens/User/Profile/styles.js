import {StyleSheet} from 'react-native';
// import { colors } from '../../../Colors/colors';

 const styles = StyleSheet.create({

    parent: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    dp: {
        height: 200,
        width: 200,
        borderRadius: 100
    },
    dpContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    details: {
        marginTop: 40,
    },
    emailDetails: {
        marginTop: 33
    },
    nameContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    iconContainer: {
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0
    },
    orgNameContainer: {
        marginLeft: 20,
    },
    text: {
        fontSize: 11,
        fontWeight: '600',
        color: 'grey',
        fontFamily: 'OpenSans-Regular'
    },
    mainText: {
        fontSize: 15,
        fontFamily: 'OpenSans-SemiBold',
        color: '#000'
    },
    editContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20
    },
    divider: {
        backgroundColor: '#40739e',
        height: 0.7,
        marginTop: 50
    },

    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        backgroundColor: 'rgba(52,52,52,0.3)'
    },
    modalView: {
        marginTop: 110,
        display: 'flex',
        flexDirection: 'column',
        height: 150,
        width: '100%',
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
    headerContainer: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    nameText: {
        color: '#000',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16
    },
    textInput: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        padding: 10
    },
    Button: {
        margin: 10
    },
    btnText: {
        color: '#000',
        fontFamily: 'Roboto-Regular',
        fontSize: 12
    },
    myPrograms: {
        marginVertical: 20
    },
    titleContainer: {
        justifyContent: 'center'
    },
    program: {
        marginLeft: 20,
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 15
    },
    modalContainer1: {
        flex: 1,
        backgroundColor: 'rgba(52,52,52,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView1: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    modalText1: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 17,
        color: '#000'
    },
    errorText: {
        color: 'red',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 11,
    }

 })

export default styles;