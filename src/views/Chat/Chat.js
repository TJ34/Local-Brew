import React, { Component } from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import Header from '../../components/Header/Header';
import './Chat.scss';

class Chat extends Component {
    constructor(props){
        super(props);

        this.state={
            message: '',
            messages: [],
            users: []
        };

        this.socket = io('localhost:3002');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        this.socket.on('RECEIVE_USERS', function(users){
            addUsers(users);
        });

        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]})
        }

        const addUsers = users => {
            this.setState({users: users})
        }

        this.sendMessage = e => {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.props.user.user.data.username,
                message: this.state.message
            })
            this.setState({message: ''});
        }
    }

    componentDidMount(){
        this.socket.emit('SEND_USER',
            this.props.user.user.data.username
        )
    }


    render(){
        console.log(this.state.users)
        return (
            <div>
                <Header />
                <div className="messageView">
                    <div className="users">
                        <p className="usersTitle">USERS</p>
                        {this.state.users.map((user, i) => {
                            return (<div key={i}>{user}</div>);
                        })}
                    </div>
                    <div className="chatRoom">
                        <div className="messages">
                            {this.state.messages.map((message,i) => {
                                return (
                                    <div key={i}>{message.author}: {message.message}</div>
                                )
                            })}
                        </div>
                        <div className="messageInput">
                            <input  type="text" placeholder="Message" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})}/>
                            <button onClick={this.sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect (mapStateToProps)(Chat);