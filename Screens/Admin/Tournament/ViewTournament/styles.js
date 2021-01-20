import { StyleSheet } from 'react-native';
import { colors } from '../../../../Colors/colors';


const styles = StyleSheet.create({
 
    container:{
        backgroundColor:'#fff',
        flex:1,
        justifyContent:'center'
    },
    box:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:20,
        backgroundColor:"#CCCCCC",
        borderRadius:12,
        margin:50
    },
    gameBtn:{
        borderRadius:12,
        marginHorizontal:20,
        marginVertical:6,
        padding:50,
        backgroundColor:'#fff',
        borderColor:'#dcdde1',
        borderWidth:0.6,
        alignItems:'center'
    },
    txt:{
        fontFamily:'OpenSans-SemiBold',
        fontSize:14,
        color:'#2c3e50',
        marginVertical:3
    },
    dateBtn:{
        padding:14,
        backgroundColor:colors.primaryColor,
        margin:20,
        borderRadius:4,
        alignItems:'center'
    }

})

export default styles;