import React from 'react'
import '../w3.css'
import '../pages.css'
import 'font-awesome/css/font-awesome.min.css'

class CreateChat extends React.Component {
  render () {
    return (
      <div className='w3-modal' style={{display: 'block'}}>
        <div className='w3-modal-content create-chat-modal w3-black w3-card w3-animate-zoom rounded'>
          <div className='w3-button w3-large w3-right w3-red'
            onClick={this.props.handleClose}>
            X
          </div>
          <div className='w3-center w3-large w3-padding-large w3-wide'>
            NEW CHATROOM NAME
          </div>
          <form className='w3-center w3-padding-large'
            onSubmit={this.props.submitHandler}>
            <input type='text'
              onChange={this.props.textChangeHandler}
              value={this.props.newChatRoom}
              placeholder='chatroom-joe...'
              required />
            <br />
            <br />
            <input type='submit' value='SUBMIT' />
          </form>
        </div>
      </div>
    )
  }
}

export default CreateChat
