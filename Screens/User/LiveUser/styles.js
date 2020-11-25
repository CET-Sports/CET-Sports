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

// ReactNativeFirebase WARNING: NPM package '@react-native-firebase/auth' depends on '@react-native-firebase/app' v8.4.5 but found v8.4.3, this might cause build issues or runtime crashes.
// ReactNativeFirebase WARNING: NPM package '@react-native-firebase/firestore' depends on '@react-native-firebase/app' v8.4.5 but found v8.4.3, this might cause build issues or runtime crashes.
// ReactNativeFirebase WARNING: NPM package '@react-native-firebase/storage' depends on '@react-native-firebase/app' v8.4.5 but found v8.4.3, this might cause build issues or runtime crashes.