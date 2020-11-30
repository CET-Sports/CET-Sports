
import { StyleSheet } from 'react-native';
import { colors } from '../../../Colors/colors';


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flexGrow:1
    },  
    pickerBox:{
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#dcdee0',
        borderRadius: 10,
        height: 55,
        marginVertical: 30,
        marginHorizontal: 30,
        backgroundColor: '#FAFAFA'
    },
    dateBtn:{
        padding:15,
        alignItems:'center',
        marginHorizontal:20,
        backgroundColor:'#c8d6e5',
        borderRadius:12,
        marginTop:20
        
    },
    TextInput:{
        borderBottomWidth:1.5,
        borderColor:colors.primaryColor,
        fontSize:16,
        marginHorizontal:10,
        marginVertical:20
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
})

export default styles;