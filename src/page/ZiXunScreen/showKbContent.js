import React from 'react'
import {Text,View,StyleSheet,ScrollView,Dimensions} from 'react-native'
import KbBody from '../../component/comm/htmlBody'
import Loading from './../../component/comm/Loading'
import kbService from './../../services/kbService'
let Spinner=require('react-native-spinkit');

class ShowContent extends React.Component{
    static navigationOptions=({navigation})=>({
        headerTitle:'文章',
    })

    constructor(){
        super();
        this.state={
            isLoading:true,
        }
    }

    async componentWillMount(){
        await kbService.getKnowledgeContent(this.props.navigation.state.params.Id)
        this.setState({
            isLoading:false
        })
    }

    _navigationComments(blogApp,id){
        const { navigate } = this.props.navigation;
        navigate("NewsComments",{
            Id:id,
            BlogApp:blogApp,
        });
    }
    render(){
        if(this.state.isLoading){
            return(
                <Loading />
            )
        }
        return(
            <View style={styles.container}>
                 <ScrollView style={{flex:1}}>
                   <View style={{margin:10}}>
                      <Text style={{fontSize:18,fontWeight:'bold',color:'black'}}>{this.props.navigation.state.params.Title}</Text>
                    </View>
                   <KbBody html={kbService.knowledgeContent} />
                 </ScrollView>
                <View>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    loading:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        color:'#666666',
        fontSize:12,
        marginTop:10
    }
})

export default ShowContent;