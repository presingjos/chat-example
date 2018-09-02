import React from 'react'
import '../pages.css'
import '../w3.css'

class ChatInput extends React.Component {
  /**
   * Create a ChatInput component to get messages from the user
   * @param {Object} props
   */
  constructor (props) {
    super(props)
    this.state = {chatInput: ''}

    // Bind the event handlers to the context of the
    // component, not to the window
    this.submitHandler = this.submitHandler.bind(this)
    this.textChangeHandler = this.textChangeHandler.bind(this)
  }

  /**
   * Event Handler: When the user types into the text form
   * Get and store what they typed.
   * @param {Object} event
   */
  textChangeHandler (event) {
    this.setState({chatInput: event.target.value})
  }

  /**
   * Event Handler: When the user hits "Submit" or hits
   * enter. Clear the stored user input and send the
   * message out to other clients
   * @param {Object} event
   */
  submitHandler (event) {
    event.preventDefault()
    this.props.onSend(this.state.chatInput)
    this.setState({chatInput: ''})
  }

  render () {
    return (
      <div className='test'>
        <form
          className='chat-input w3-center'
          onSubmit={this.submitHandler}>
          <input type='text'
            onChange={this.textChangeHandler}
            value={this.state.chatInput}
            placeholder='Write a message...'
            required />
          <input type='submit' value='SUBMIT' />
        </form>
      </div>
    )
  }
}

export default ChatInput
