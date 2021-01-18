
import { StyleSheet } from 'react-native';
import { colors } from '../../../../Colors/colors';

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flexGrow:1
    },  
    pickerBox:{
        justifyContent: 'center',
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
    dateBtn:{
        padding:15,
        alignItems:'center',
        marginHorizontal:20,
        backgroundColor:'#c8d6e5',
        borderRadius:12,
        marginTop:20
        
    },
    TextInput: {
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(52,52,52,0.5)',
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
        padding: 30
    },
    fontMain:{
        marginLeft: 20, 
        marginTop: 20,
        fontFamily:'OpenSans-SemiBold',
        fontSize:20
    },
    fontSml:{
        fontFamily:'OpenSans-Regular',
        fontSize:16
    }
})

export default styles;