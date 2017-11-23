import * as React from 'react';
import {
	AppRegistry,
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
    AsyncStorage
} from 'react-native';
import Http from '../../utils/Http'
import formatDate from '../../utils/formatDate'
import Url from '../../config/Url';
import axios from 'axios';

const { SwipeListView, SwipeRow }=require('react-native-swipe-list-view');

class MyBookmarkScreen extends React.Component{
	static navigationOptions={
        title:'我的收藏',
        headerStyle:{
            marginTop:20
        }
    }
	constructor() {
		super()
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			listViewData:[]
		};
    }
    async componentWillMount(){
        await this.getBookmarksList()
	}
	
    _goDeail(item){
        const { navigate } = this.props.navigation;
        navigate("Content",{
            Url:item.LinkUrl,
            title:item.Title,
            type:'blog'
        });
    }

	async deleteRow(secId, rowId, rowMap,data) {
		rowMap[`${secId}${rowId}`].closeRow();
		const newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
		this.setState({listViewData: newData});
		await this.removeBookmarks(data.WzLinkId)
    }
    
    async _request(url,access_token){
        let response=await Http.GetAsync(url,access_token);
        return response.data;
	}

	async getBookmarksList(){
		const tokenStr=await AsyncStorage.getItem('a_token');
        let url='https://api.cnblogs.com/api/Bookmarks'       
             let access_token=JSON.parse(tokenStr).access_token;
             let data=await this._request(url,access_token);
             this.setState({
                listViewData:data
             })
	}
	
	async removeBookmarks(id){
		const tokenStr=await AsyncStorage.getItem('a_token');
        let access_token=JSON.parse(tokenStr).access_token;
        let response=await axios({
            method:'Delete',
            url:`https://api.cnblogs.com/api/bookmarks/${id}`,
            headers:{
              "Authorization":`Bearer ${access_token}`
                }
			})
		await this.getBookmarksList()
	}

	render() {
		return (
			<View style={styles.container}>
					<SwipeListView
						dataSource={this.ds.cloneWithRows(this.state.listViewData)}
						renderRow={ data => (
							<TouchableHighlight
								onPress={ ()=>this._goDeail(data) }
								style={styles.rowFront}
							>
								<View>
									<Text style={styles.title}>{data.Title}</Text>
                                    <Text style={{marginLeft:10}}>收藏于 {formatDate(data.DateAdded)}</Text>
								</View>
							</TouchableHighlight>
						)}
						renderHiddenRow={ (data, secId, rowId, rowMap) => (
							<View style={styles.rowBack}>
                            <Text>分享</Text>
								<View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
									<Text style={styles.backTextWhite}>分享</Text>
								</View>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(secId, rowId, rowMap,data) }>
									<Text style={styles.backTextWhite}>删除</Text>
								</TouchableOpacity>
							</View>
						)}
						leftOpenValue={0}
                        rightOpenValue={-150}
					/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#E9E9EF',
		flex: 1
	},
	title:{
		color:'black',
		fontSize:15,
		margin:10
	},
	standalone: {
		marginTop: 30,
		marginBottom: 30,
	},
	standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: 'white',
		justifyContent: 'center',
		height:75,
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8BC645',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		backgroundColor: 'white',
		borderBottomColor: '#dddddd',
		borderBottomWidth: 1,
		justifyContent: 'flex-start',
		height: 75,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: '#2196F3',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: 100,
	}
});

export default MyBookmarkScreen;