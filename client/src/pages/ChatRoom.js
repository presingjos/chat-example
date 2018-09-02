import React from 'react'
import './w3.css'
import './pages.css'
import io from 'socket.io-client'
import Messages from './components/Messages'
import ChatInput from './components/ChatInput'
const path = require('path')

// Get the domain name of the server
// TODO: Find a better way to do this
const proxyDomain = require('../../package.json')

class ChatRoom extends React.Component {
  constructor (props) {
    super(props)

    // If the user does not come from the HomePage
    // set there name to nameless
    let username = 'nameless'
    if (this.props.location.username) {
      username = this.props.location.username
    }

    this.state = {
      name: this.props.match.params.name,
      messages: [],
      username: username,
      numUsers: 0
    }
    this.sendHandler = this.sendHandler.bind(this)

    // Connect to the socket server
    this.socket = io(proxyDomain.proxy)

    this.socket.on('connect', () => {
      // Connected, let's sign-up for to receive messages for this room
      this.socket.emit('room', this.state.name)
    })

    // Listen to receive messages from the server
    this.socket.on('chat', (message) => {
      // Display the `message!
      this.addMessage(message)
    })
  }

  /**
   * When the component mounts get the history
   * of messages from the server.
   */
  componentDidMount () {
    fetch(`/api/chatrooms/${this.state.name}`)
      .then(res => res.json())
      .then(chatroom => {
        this.setState({
          name: chatroom.name,
          messages: chatroom.messages
        })
      })
  }

  /**
   * Event Handler: Dispay the new message
   * @param {String} message
   */
  addMessage (message) {
    const messages = this.state.messages
    messages.push(message)
    this.setState({messages: messages})
  }

  sendHandler (message) {
    // Now go store the message on the server
    fetch(`/api/chatrooms/${this.state.name}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        username: this.state.username
      })
    })

    const messageObject = {
      message: message,
      username: this.state.username
    }
    // Emit the message to other users
    this.socket.emit('chat', this.state.name, messageObject)
    messageObject.fromMe = true
    this.addMessage(messageObject)
  }

  render () {
    let imageDir = path.join('images', 'background2.jpg')
    imageDir = 'https://nameless-river-14287.herokuapp.com/' + imageDir
    return (
      <div className='parallax' style={{backgroundImage: `url('${imageDir}')`}}>
        <div className='chatroom w3-display-middle rounded' >
          <h3>
            {this.state.name}
          </h3>
          <div>
            <Messages
              messages={this.state.messages}
              username={this.state.username}
            />
            <ChatInput onSend={this.sendHandler} />
          </div>
        </div>
      </div>
    )
  }
}

export default ChatRoom
