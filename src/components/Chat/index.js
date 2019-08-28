import React, {Component} from 'react';
import {StyleSheet,View, Text, TextInput} from 'react-native';
import {Container, Spinner, Button, Icon} from 'native-base';
import withFooter from '../../hoc/withFooter';
import io from 'socket.io-client';
import './UserAgent';

const style = StyleSheet.create({
	main: {
			flex: 1, 
			flexDirection: 'column',
	        justifyContent: 'space-between',
	        alignItems: 'stretch'
    	},
	chatbox: { 
				backgroundColor: 'grey',
				flex: 1,
				justifyContent: 'flex-end',
				marginBottom: 20,
				paddingLeft: 5,
				paddingRight: 5
			  },
	  loader: {
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
				},
});

class Chat extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			text: ''
		};
		
	}

	componentDidMount() {
		const socket = io('http://localhost:3000',{
		});
		socket.connect();
		socket.on('connect',  () => {
			console.log('connected to socket server')
		});
		socket.emit('messages', 'From app wlcm');
		socket.on('join', data => {
			console.log('Data recieved from server', data)
		})
		socket.on('messages', (data) => {
			console.log('Data from messages', data)
		})
		socket.on('connect_error', (err) => {
	      console.log(err)
	    })

	    socket.on('disconnect', () => {
	      console.log("Disconnected Socket!")
	    })
	}

	render() {
		let {loading, text} = this.state;
		if ( loading ) {
			return <Spinner style={style.loader} color="blue"/>;
		}
		return (
				<View style={style.main}>
					<Text>Chat room</Text>
					<View style={style.chatbox}>
						<TextInput 
							placeholder="type here to start"
							value={text}
							onChangeText={(text) => this.setState({text})}
						></TextInput>
						<Button light style={{width: 50, alignSelf: 'flex-end'}} onPress={() => console.log(text)}><Icon type="FontAwesome" name="paper-plane" style={{fontSize: 20, color: 'blue'}}/></Button>
					</View>
				</View>
			)
	}
}

const hocChat = withFooter({active: 'Chat'})(Chat);
export default hocChat;

