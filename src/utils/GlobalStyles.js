import Family from "../Utilities/Family";
import theme from "./theme";

export const  globalStyles = {
    rowflex:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
        width:"100%"
    },
    straightline:{height:2,width:"100%",backgroundColor:'black',opacity:.1,marginTop:15},
    searchBox: {
      backgroundColor:"white",
      // opacity:.8,
        height: 40,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 7,
        alignItems: 'center',
        borderWidth:1,borderColor:'black',
        // elevation:1,
        marginVertical:10,
        borderWidth:1,
        borderColor:"rgba(0,0,0,.1)"
      },
    rowflex2:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"

    },
    globalFontFamily:{
      fontFamily:"",
    },
    text:{
      color:"black",
      fontFamily:Family.Medium,
      fontSize:16,
      fontWeight:"bold"
    },
    textInput:{
      color:"black",
      borderRadius:3,borderWidth:1.5,borderColor:"rgba(0,0,0,.1)",height:45,width:"90%",marginTop:7,marginLeft:5,justifyContent:"center",alignItems:'center',padding:10,borderRadius:10
    },
    text2:{
        color:"black",
        fontFamily:"RedditSans-Medium",
        fontSize:14.5,
        // fontWeight:"bold"
      },
    container:{
        width:"100%",
        height:"100%",
        backgroundColor:"white",
        paddingHorizontal:30,
        paddingVertical:30
        
    },
    container2:{
        width:"100%",
        height:"100%",
        backgroundColor:theme.colors.bg,
        paddingHorizontal:15,
        // paddingVertical:10,
        paddingBottom:70,

        
    },
    container3:{
        width:"100%",
        height:"100%",
        backgroundColor:"white",
        paddingHorizontal:10,
        paddingVertical:10
        
    },
    box:{
      height: 90,
      backgroundColor: 'white',
      borderRadius: 10,
      width: '99.5%',
      marginLeft: 1,
  
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 1,
      marginVertical: 10,
    },

}