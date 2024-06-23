import { StyleSheet ,Dimensions} from "react-native"
export default StyleSheet.create({
    container:{
        //borderRadius: 20, 
        //padding: 0,
        //margin:0,
        //overflow: 'hidden', 
        //height: Dimensions.get('window').height/7,
       // width: Dimensions.get("window").width/1.3,
       //flex:0.5,
        backgroundColor:"#9D00FF",
    },
    title:{
        color: "#FFFFFF",
        fontSize: 18,
    },
    image:{
        resizeMode:"cover",
        height: Dimensions.get('window').height/10,
        width: Dimensions.get("window").width/4,
        borderRadius: 10,
    },
    text:{
        color:"#FFFFFF",
        marginLeft: 10, 
        fontSize: 18, 
    },
    
});
