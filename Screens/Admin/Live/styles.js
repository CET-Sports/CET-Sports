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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
},
Button: {
    margin: 10
},
buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 10
},
})

export default styles;