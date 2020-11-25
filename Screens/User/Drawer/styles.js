
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    parent:{
        flex:1,
        backgroundColor:'#fff'
    },
    dpContainer:{
        borderBottomWidth:0.5,
        borderColor:'#CCCCCC',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:20
    },
    button:{
        marginHorizontal:5,
        height:50,
        alignItems:'center',
        flexDirection:'row'
    },
    avatar:{
        height:120,
        width:120,
        alignSelf:'center',
        borderRadius:100
    },
    drawerText:{
        fontFamily:'OpenSans-SemiBold',
        marginLeft:15,
        fontSize:15
    },
    icon:{
        marginLeft:10
    },
    name:{
        alignSelf:'center',
        fontFamily:'OpenSans-Bold',
        marginVertical:10
    }
})

export default styles;