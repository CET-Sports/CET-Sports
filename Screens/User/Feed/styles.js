import {StyleSheet} from 'react-native';
import { colors } from '../../../Colors/colors';

 const styles = StyleSheet.create({
feedImage:{
    height:400,
},
title:{
    marginHorizontal:10,
    marginVertical:8,
    lineHeight:25,
    fontFamily:'Roboto-Regular',
    fontSize:20,
    color:'#000',
    opacity:5
},
content:{
    marginHorizontal:8,
    marginBottom:13,
    fontFamily:'Roboto-Light',
    fontSize:17,
    color:'#000',
    opacity:8,
    lineHeight:28
},
divider:{
    height:1,
    opacity:0.3,
    backgroundColor:'#CCCCCC'
},
Container:{
    backgroundColor:'#fff',
    justifyContent:'center',
}
})

export default styles;