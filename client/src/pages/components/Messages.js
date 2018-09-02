import React from 'react'

class Messages extends React.Component {
  componentDidUpdate () {
    // When the component re-renders scoll the bottom of the
    // list
    const objDiv = document.getElementById('messageList')
    objDiv.scrollTop = objDiv.scrollHeight
  }

  // Loop through the all messages given and
  // render
  render () {
    console.log(this.props.messages)
    const messages = this.props.messages.map((message, i) => {
      let fromMe = (this.props.username === message.username)

      return (
        <Message
          key={i}
          message={message.message}
          username={message.username}
          fromMe={fromMe}
        />
      )
    })
    return (
      <div className='messages' id='messageList'>
        {messages}
      </div>
    )
  }
}

class Message extends React.Component {
  // console.log(this.props.username)
  render () {
    console.log(this.props.fromMe)
    const messageStyle = `message-body ${this.props.fromMe ? 'from-me' : 'not-from-me'}`
    return (
      <div className={messageStyle}>
        <div>
          {this.props.message}
        </div>
        <h6>
          {this.props.username}
        </h6>
      </div>
    )
  }
}

export default Messages
