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
        padding:20,
        borderRadius: 5,
        marginTop: 40,
        marginHorizontal:20,
        alignItems:'center'
    },
    txt: {
        color: '#fff',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14
    },
    parent: {
        backgroundColor: '#fff',
        flex: 1
      },
      Image: {
        marginTop: 20,
        height: 250,
        width: 'auto',
        opacity: 0.5,
        margin: 15
      },
      imageContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'dashed',
        borderRadius: 10,
        margin: 15
      },
      textinput: {
        backgroundColor: '#ECEFF1',
        textAlignVertical: 'top',
        padding: 5,
        fontFamily: 'OpenSans-Regular',
        height: 160,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#dcdee0',
        textAlign: 'justify',
        marginTop: 15,
        marginHorizontal:15,
        paddingLeft: 15,
        paddingTop: 13
      },
      textinputS: {
        backgroundColor: '#ECEFF1',
        padding: 5,
        fontFamily: 'OpenSans-Regular',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#dcdee0',
        textAlign: 'justify',
        marginTop: 15,
        marginHorizontal: 15,
        paddingLeft: 15
      },
      button: {
        flex: 1,
        marginTop: 25,
        marginBottom: 10,
        backgroundColor: colors.primaryColor,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10
      },
      modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(52,52,52,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
      },
      modalView: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
      },
      modalText: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 17,
        color: '#000'
      },
      errorText: {
        marginLeft: 15,
        color: 'red',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 11
      },
      flatItem:{
          margin:25
      },
      flatTxt:{
        color: '#000',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14
      }
})

export default styles;
