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
        color:colors.primaryColor,
        marginVertical:3
    },
    textinputS: {
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
      label:{
        fontFamily: 'OpenSans-Regular',
        fontSize:12,
        marginLeft:15,
        marginTop:10
      },
      uploadBtn:{
        backgroundColor:colors.primaryColor,
        padding:15,
        marginHorizontal:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop: 15,
        marginBottom:20,
        borderRadius:6
    },



});

export default styles;