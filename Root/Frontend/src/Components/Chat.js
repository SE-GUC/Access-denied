import React, { Component } from "react";
import { Launcher } from "react-chat-window";
import Dialog from "./Dialog";
import io from "socket.io-client";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
      them: null,
      chats: []
    };
  }
  getMessages() {
    if (!this.state.them) return;
    let id = this.props.id;
    fetch(`/api/message/convo?id1=${id}&id2=${this.state.them}`)
      .then(res => res.json())
      .then(messages => {
        messages.sort((a, b) => new Date(a.date) - new Date(b.date));
        let currentState = this.state;
        currentState.messageList = messages.map(message => {
          let author = message.from === id ? "me" : "them";
          return {
            author: author,
            type: "text",
            data: { text: message.message }
          };
        });
        this.setState(currentState);
      });
  }
  componentDidMount() {
    let id = this.props.id;
    this.getMessages();
    fetch(`/api/message?id=${id}`)
      .then(res => res.json())
      .then(chats => {
        this.setState({ chats: chats });
      });
    var socket = io();
    socket.on(id, obj => {
      if (obj.from === this.state.them) {
        this.setState({
          messageList: [
            ...this.state.messageList,
            {
              author: obj.from === id ? "me" : "them",
              type: "text",
              data: { text: obj.message }
            }
          ]
        });
      } else {
        this.props.handleNotification(true);
      }
    });
  }

  _onMessageWasSent(message) {
    fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: this.props.id,
        to: this.state.them,
        date: new Date(),
        message: message.data.text
      })
    }).then(data => console.log(data));
    this.setState({
      messageList: [...this.state.messageList, message]
    });
  }

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            author: "them",
            type: "text",
            data: { text }
          }
        ]
      });
    }
  }
  async handleChat(chat) {
    await this.setState({ them: chat });
    this.getMessages();
  }
  render() {
    return (
      <div>
        {!this.state.them ? (
          <></>
        ) : (
          <Launcher
            agentProfile={{
              teamName: this.state.them,
              imageUrl:
                "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
            }}
            onMessageWasSent={this._onMessageWasSent.bind(this)}
            messageList={this.state.messageList}
            showEmoji
          />
        )}
        <Dialog
          chats={this.state.chats}
          handleChat={this.handleChat.bind(this)}
        />
      </div>
    );
  }
}

export default Chat;
