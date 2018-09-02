import React from 'react'
import '../w3.css'
import '../pages.css'
import 'font-awesome/css/font-awesome.min.css'

class StartChatModal extends React.Component {
  render () {
    return (
      <div className='w3-modal' style={{display: 'block'}}>
        <div className='w3-modal-content w3-black w3-card w3-animate-opacity rounded start-chat-modal'>
          <div className='w3-button w3-right w3-xsmall w3-red'
            onClick={this.props.handleClose}>
            X
          </div>
          <div className='w3-center w3-large w3-padding-large w3-wide center'>
            ENTER NICKNAME
          </div>
          <form className='w3-center w3-padding-large start-chat-form'
            onSubmit={this.props.submitHandler}>
            <input type='text'
              onChange={this.props.textChangeHandler}
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

export default StartChatModal
