import { StyleSheet } from 'react-native';
import { colors } from '../../../Colors/colors';

const styles = StyleSheet.create({
    RtcView: {
        backgroundColor: '#000',
        height: 350
    },
    liveBtn: {
        backgroundColor: colors.primaryColor,
        padding: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    heading: {
        alignSelf: 'center',
        fontSize: 30,
    },
    rtcview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        margin: 0,
    },
    rtc: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    toggleButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    callButtons: {
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonContainer: {
        margin: 5,
    },
    liveBtnContainer: {
        padding: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rounded: {
        borderRadius: 100,
        backgroundColor: '#ecf0f1',
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 25
    }
})

export default styles;

// ReactNativeFirebase WARNING: NPM package '@react-native-firebase/auth' depends on '@react-native-firebase/app' v8.4.5 but found v8.4.3, this might cause build issues or runtime crashes.
// ReactNativeFirebase WARNING: NPM package '@react-native-firebase/firestore' depends on '@react-native-firebase/app' v8.4.5 but found v8.4.3, this might cause build issues or runtime crashes.
// ReactNativeFirebase WARNING: NPM package '@react-native-firebase/storage' depends on '@react-native-firebase/app' v8.4.5 but found v8.4.3, this might cause build issues or runtime crashes.