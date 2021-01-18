
import { StyleSheet } from 'react-native';
import { colors } from '../../../Colors/colors';

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flexGrow:1
    },
    addTournament:{
        backgroundColor:'#fff'
    },
    addBtn:{
        padding:15,
        alignItems:'center',
        borderBottomColor:'#dff9fb',
        borderBottomWidth:0.5,
        marginBottom:12
    },
    addFont:{
        color:colors.primaryColor,
        fontFamily:'OpenSans-SemiBold',
        marginTop:5
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
    gameBtntext:{
        color:colors.primaryColor,
        fontFamily:'OpenSans-Bold',
        fontSize:18
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
    }
})

export default styles;