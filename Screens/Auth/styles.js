import {StyleSheet} from 'react-native';
import { colors } from '../../Colors/colors';

 const styles = StyleSheet.create({
     parent:{
         flex:1,
        backgroundColor:'#fff',
        justifyContent:'center'
     }, 
    phoneInput:{
        borderBottomWidth:1.5,
        borderColor:colors.primaryColor,
        flex:1,
        fontSize:16,
        letterSpacing:1,
        fontFamily:'OpenSans-Regular',
    },
    phoneInput1:{
        borderBottomWidth:1.5,
        borderColor:colors.primaryColor,
    },
    phoneInput1Text:{
        color:'grey',
        fontFamily:'OpenSans-Regular',
        fontSize:16,
        letterSpacing:1,
        marginBottom:14.3
    },
    phonInputContainer:{
        flexDirection:'row',
        alignItems:'flex-end',
        marginHorizontal:70
    },
    phoneText:{
        marginRight:7,
        fontSize:16
    },
    button:{
        backgroundColor:colors.primaryColor,
        marginHorizontal:70,
        paddingVertical:12,
        alignItems:'center',
        borderRadius:7,
        marginTop:20
    },
    btnText:{
        color:'#fff',
        fontFamily:'OpenSans-SemiBold'
    },
    otpText:{
        alignSelf:'center',
        marginTop:15,
        fontFamily:'OpenSans-Regular',
        fontSize:14,
        color:'grey'
    },
    otpInput:{
        marginTop:10,
        borderBottomColor:colors.primaryColor,
        borderBottomWidth:1.5,
        marginHorizontal:70,
        textAlign:'center',
        letterSpacing:10,
        fontFamily:'OpenSans-SemiBold',
        fontSize:20
    },
    TextInput:{
        borderBottomWidth:1.5,
        borderBottomColor:colors.primaryColor,
        marginHorizontal:15,
        marginVertical:5,
        textAlignVertical:'bottom'
    },
    dropDown:{
        borderBottomWidth:1.5,
        borderBottomColor:colors.primaryColor,
        marginHorizontal:15,
        marginVertical:5,
    },
    mainText:{
        color:'#FFA726',
        alignSelf:'center',
        fontFamily:'OpenSans-Bold',
        opacity:0.8,
        marginTop:-3
    },
    avatar:{
        height:120,
        width:120,
        alignSelf:'center'
    },
})

export default styles;