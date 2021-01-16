import { StyleSheet } from 'react-native';
import { colors } from '../../../Colors/colors';

const styles=StyleSheet.create({

    container:{
        backgroundColor:'#fff',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    btn:{
        backgroundColor:colors.primaryColor,
        width:275,
        paddingVertical:20,
        borderRadius:12,
        alignItems:'center',
        justifyContent:'center',
        margin:10
    },
    btnTxt:{
        color:'#fff',
        fontFamily:'OpenSans-SemiBold',
        fontSize:13
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



});

export default styles;