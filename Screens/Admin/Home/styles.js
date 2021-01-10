import {StyleSheet} from 'react-native';
import { colors } from '../../../Colors/colors';

 const styles = StyleSheet.create({
uploadBtn:{
    backgroundColor:colors.primaryColor,
    padding:10,
    marginHorizontal:10,
    alignItems:'center',
    justifyContent:'center',
    marginTop: 15,
},
 textinput: {
    backgroundColor: '#f1f2f6',
    textAlignVertical: 'top',
    padding: 5,
    fontFamily: 'OpenSans-Regular',
    height: 160,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dcdee0',
    textAlign: 'justify',
    marginTop: 15,
    marginHorizontal:15,
    paddingLeft: 15,
    paddingTop: 13
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
  errorText: {
    marginLeft: 15,
    color: 'red',
    fontFamily: 'OpenSans-Regular',
    fontSize: 12
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(52,52,52,0.3)'
},
modalView: {
    marginTop: 110,
    display: 'flex',
    flexDirection: 'column',
    height: 150,
    width: '100%',
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 100,
    elevation: 100,
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FAFAFA'
},
modalContainer1: {
    flex: 1,
    backgroundColor: 'rgba(52,52,52,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
},
modalView1: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
},
modalText1: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 17,
    color: '#000'
}
})

export default styles;