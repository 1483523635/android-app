import React from 'react'
import {View,Text,StyleSheet,Platform,Dimensions,TouchableHighlight} from 'react-native'
import {Avatar} from 'react-native-elements'
import AutoHeightWebView from 'react-native-autoheight-webview'
import formatDate from '../../utils/formatDate'


class NewsComment extends React.Component{
    render(){
        const data=this.props.data
        return(
            <View style={styles.container}>
              <View style={styles.container_left}>
                 <Avatar
                  small
                  source={{uri:data.FaceUrl}}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
               />
                </View>
                <View style={styles.container_right}>
                    <View>
                        <Text style={styles.author}>{data.UserName}</Text>
                    </View>

                    <View style={{marginRight:8}}>
                    <AutoHeightWebView
                      hasIframe={true}
                      scalesPageToFit={Platform.OS === 'android' ? true : false} 
                      enableBaseUrl={true}
                      enableAnimation={true}
                      animationDuration={255}
                      source={{ html:data.CommentContent}} 
                      style={{ width: Dimensions.get('window').width -15-48}}
                      customScript={`document.body.style.background = 'white';`}
                      onError={() => console.log('on error')}
                      onLoad={() => console.log('on load')}
                      onLoadStart={() => console.log('on load start')}
                      onLoadEnd={() => console.log('on load end')}
                      customStyle={`
                       * {
                           font-family: 'Times New Roman';
                           margin-top:3px
                           text-indent:4px;                          
                         }
                      p {
                          font-size: 13px;
                         }
                      img {
                         width:100%;
                         height:auto;
                       }
                    `}
                    />
                    </View>
                    <View style={styles.container_bottom}>
                        <Text style={{marginLeft:5}}>{formatDate(data.DateAdded)}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'white'
    },
    container_left:{
        width:50,
        marginLeft:8,
        marginRight:5,
        marginTop:8
    },
    container_right:{
        flex:1,
        marginTop:8
    
    },
    container_bottom:{
        flexDirection:'row',
        marginBottom:5
    },
    author:{
        fontSize:15,
        color:'#333333'
    }
})

export default NewsComment