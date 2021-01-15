
import { StyleSheet } from 'react-native';
import {colors} from '../../../Colors/colors';

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    containerClb:{
        backgroundColor:'#fff',
        flex:1,
        justifyContent:'center',
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
      clbView:{
          margin:10,
          flexDirection:'row'
      },
      imgBtn:{
          marginHorizontal:15
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
    clbTxt:{
        color:colors.primaryColor,
        fontFamily:'OpenSans-SemiBold',
        marginTop:5,
        fontSize:14
    },
    txt:{
        fontFamily:'OpenSans-SemiBold',
        fontSize:14,
        color:'#2c3e50',
        marginVertical:3
    }
})

export default styles;