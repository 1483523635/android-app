import * as React from 'react';
import { Text, View, StyleSheet,Image, TouchableHighlight, AsyncStorage } from 'react-native';
import Http from '../../utils/Http'
import {Icon,Thumbnail} from 'native-base'

class User extends React.Component{
    _navigateToLogin(){
        this.props.navigation.navigate('Login')
    }
    render(){       
        if(this.props.isLogin){
            const {user}=this.props;
            return(
                <View style={styles.contains}>
                    <View style={styles.top}>
                        <View>
                        <Thumbnail
                           source={{uri:user.Avatar}}
                         />
                        </View>
                        <View style={styles.user}>
                            <View><Text style={styles.nickName}>{user.DisplayName}</Text></View>
                            <View><Text style={styles.introduction}>园龄:{user.Seniority}</Text></View>
                        </View>
                    </View>
                    <View style={styles.hr}>
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.blog}>
                            <View><Text>0</Text></View>
                            <View><Text>博文</Text></View>
                        </View>
                        <View style={styles.attention}>
                            <View><Text>0</Text></View>
                            <View><Text>关注</Text></View>
                        </View>
                        <View style={styles.fans}>
                            <View><Text>0</Text></View>
                            <View><Text>粉丝</Text></View>
                        </View>
                    </View>
                </View>
            )}
        return(
            <View style={styles.contains}>
            <TouchableHighlight
            onPress={()=>this._navigateToLogin()}>
            <View style={styles.login}>
            <Icon
                name='md-contact'
                size={30}
                style={styles.icons}
            />
            <Text style={styles.loginText}>登录/注册</Text>
            </View>
            </TouchableHighlight>
            </View>
            )
    }
}

const styles=StyleSheet.create({
    contains:{
        backgroundColor:'white',
        marginTop:10,
        borderBottomWidth:1,
        borderStyle:'solid',
        borderColor:'#dddddd', 
    },
    login:{
        flexDirection:'row',
        alignItems:'center',
        height:49
    },
    loginText:{
        fontSize:18,
        margin:10
    },
    icons:{
        marginLeft:15,
        color:'#708090'
    },
    top:{
        flexDirection:'row',
        marginLeft:18,
        marginTop:10,
        marginBottom:10
    },
    user:{
        marginLeft:15
    },
    nickName:{
        fontSize:18,
        color:'black'
    },
    introduction:{
        fontSize:12
    },
    hr:{
        borderBottomWidth:1,
        borderStyle:'solid',
        borderColor:'#dddddd',
    },
    bottom:{
        marginBottom:10,
        marginTop:10,
        flexDirection:'row',    
    },
    blog:{
        flex:4,
        justifyContent:'center',
        alignItems:'center'        
    },
    attention:{
        flex:4,
        justifyContent:'center',
        alignItems:'center'     
    },
    fans:{
        flex:4,
        justifyContent:'center', 
        alignItems:'center'        
    }
})
export default User;