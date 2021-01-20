
import { StyleSheet } from 'react-native';
import { colors } from '../../../../Colors/colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexGrow: 1
    },
    addTournament: {
        backgroundColor: '#fff'
    },
    addBtn: {
        padding: 15,
        alignItems: 'center',
        borderBottomColor: '#dff9fb',
        borderBottomWidth: 0.5,
        marginBottom: 12
    },
    addFont: {
        color: colors.primaryColor,
        fontFamily: 'OpenSans-SemiBold',
        marginTop: 5
    },
    gameBtn: {
        borderRadius: 12,
        marginHorizontal: 20,
        marginVertical: 6,
        padding: 50,
        backgroundColor: '#fff',
        borderColor: '#dcdde1',
        borderWidth: 0.6,
        alignItems: 'center'
    },
    gameBtntext: {
        color: colors.primaryColor,
        fontFamily: 'OpenSans-Bold',
        fontSize: 18
    },
    levelText: {
        letterSpacing: 2,
        color: '#CCCCCC',
        fontSize: 16,
        marginTop: 10
    },
    pending: {
        color: '#ff3838',
        fontFamily: 'OpenSans-SemiBold',
        marginTop: 10
    },
    ongoing: {
        color: '#32ff7e',
        fontFamily: 'OpenSans-SemiBold',
        marginTop: 10
    },
    header: {
        backgroundColor: '#fff',
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: '#000000',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14
    },
    scoreBoard: {
        paddingVertical: 10,
        backgroundColor: '#1e3799',
        borderRadius: 12,
        marginHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    teamName: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'OpenSans-SemiBold',
        margin: 20
    },
    nameCntnr: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    gmeMsg: {
        alignSelf: 'center',
        margin: 10,
        fontFamily: 'OpenSans-SemiBold',
        color: '#000000',
        fontSize: 12
    },
    scoreCalc: {
        marginTop: 20,
        flex: 1,
        borderTopWidth: 0.9,
        borderColor: 'grey',
        justifyContent: 'center',
    },
    score: {
        height: 50,
        width: 50,
        margin: 10
    },
    plusBtn: {
        padding: 15,
        borderRadius: 12,
        borderColor: colors.primaryColor,
        borderWidth: 1.5,
        alignItems: 'center',
        marginHorizontal: 10
    },
    endBtn: {
        padding: 12,
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: '#c82333',
        marginHorizontal: 15,
        borderRadius: 3
    },
    btnCntnr: {
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    nameBtn: {
        marginTop: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        borderColor: '#000000',
        borderWidth: 0.5
    },
    btnTxt: {
        color: '#000000',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 18
    },
    updateBtnContainer: {
        flexDirection: 'row'
    },
    plus: {
        backgroundColor: '#28a745',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingHorizontal: 20,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,

    },
    minus: {
        backgroundColor: '#c82333',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingHorizontal: 23,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4

    },
    txt: {
        color: '#fff'
    },
    hdrTxt: {
        textAlign: 'center',
        fontFamily: 'OpenSans-SemiBold',
        marginBottom: 5
    }

    //add cricket 

    , TextInput: {
        backgroundColor: '#f1f2f6',
        padding: 5,
        fontFamily: 'OpenSans-Regular',
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#dcdee0',
        textAlign: 'justify',
        marginTop: 15,
        marginHorizontal: 15,
        paddingLeft: 15
    },
    btn:{
        backgroundColor:colors.primaryColor,
        margin:15,
        padding:18,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    btnTxtf:{
        color: '#ffffff',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 18
    },
    modalContainer1: {
        flex: 1,
        backgroundColor: 'rgba(52,52,52,0.5)',
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
        padding: 30
    },
    pending:{
        color:'#ff3838',
        fontFamily:'OpenSans-SemiBold',
        marginTop:10
    },
    ongoing:{
        color:'#32ff7e',
        fontFamily:'OpenSans-SemiBold',
        marginTop:10
    },

    //status checkin btn
    ctnr:{
        backgroundColor:'#fff',
        flexGrow:1,
        justifyContent:'center'
    },
    BtnBegin:{
        padding:15,
        marginHorizontal:40,
        borderRadius:5,
        backgroundColor:colors.primaryColor,
        alignItems:'center'
    },
    btnText:{
        color:'#fff',
        fontFamily:'OpenSans-Regular'
    },

    //modal

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
    _btnText: {
        color: '#000',
        fontFamily: 'Roboto-Regular',
        fontSize: 12
    }
})
export default styles;