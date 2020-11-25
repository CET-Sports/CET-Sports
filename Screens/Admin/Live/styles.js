import {StyleSheet} from 'react-native';
import { colors } from '../../../Colors/colors';

 const styles = StyleSheet.create({
    RtcView:{
    backgroundColor:'#000',
    height:350
},
liveBtn:{
    backgroundColor:colors.primaryColor,
    padding:10,
    marginHorizontal:10,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10
}
})

export default styles;