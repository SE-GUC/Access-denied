import React, { Component } from "react";
import { Launcher } from "react-chat-window";
import Dialog from "./Dialog";
import io from "socket.io-client";

import qs from "query-string";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
      them: "5ca0c0b44e81266044cf2b70",
      chats: []
    };
  }
  getMessages() {
    let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
      .id;
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
    let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
      .id;
    this.getMessages();
    fetch(`/api/message?id=${id}`)
      .then(res => res.json())
      .then(chats => {
        this.setState({ chats: chats });
      });
    var socket = io();
    socket.on(id, obj => {
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
    });
  }

  _onMessageWasSent(message) {
    fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
          .id,
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
        <Launcher
          agentProfile={{
            teamName: "react-chat-window",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji
        />
        <Dialog
          chats={this.state.chats}
          handleChat={this.handleChat.bind(this)}
        />
      </div>
    );
  }
}

export default Chat;
