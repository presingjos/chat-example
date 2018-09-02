import React from 'react'
import './w3.css'
import './pages.css'
import 'font-awesome/css/font-awesome.min.css'
import SideBar from './components/SideBar'
import CreateChat from './components/CreateChat'
import StartChatModal from './components/StartChatModal'

const path = require('path')
const proxyDomain = require('../../package.json')

class HomePage extends React.Component {
  /**
   * Create a component
   * @param {object} props - Properties
   */
  constructor (props) {
    super(props)
    // Intialize the state to:
    // - Not show the sidebar
    // - Not show the createChat popup
    // - Show the NavBar (Navigation bar at the top
    //   of the page)
    this.state = {
      chatrooms: [],
      newChatRoom: '',
      username: '',
      startChattingText: 'START CHATTING',
      showSideBar: false,
      showCreateChat: false,
      showNavBar: false,
      showStartChatModal: false
    }
    // Bind methods to the context of the component NOT the window!!!!
    this.textChangeHandler = this.textChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSideBarClick = this.handleSideBarClick.bind(this)
    this.handleCreateChatClick = this.handleCreateChatClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleStartChat = this.handleStartChat.bind(this)
    this.handleCloseStartChatModal = this.handleCloseStartChatModal.bind(this)
    this.handleAddUser = this.handleAddUser.bind(this)
    this.userChangeHandler = this.userChangeHandler.bind(this)
  }

  /**
   * When component is inserted in the tree go and get
   * the chatrooms from the server
   */
  componentDidMount () {
    // Make a HTTP GET request to get the chatrooms from
    // the server
    fetch('/api/chatrooms')
      .then(res => res.json())
      .then(chatrooms => this.setState({
        chatrooms: chatrooms
      }))
  }

  handleAddUser (event) {
    event.preventDefault()

    // Welcome the user by changing the text
    // of the 'START CHATTING' button
    let welcomeMessage = `WELCOME ${this.state.username}`

    // Hide the startChatModal and show the welcome message
    this.setState({
      showStartChatModal: false,
      startChattingText: welcomeMessage
    })

    // Show the navigation bar
    this.handleClose()
  }

  handleClick () {
    console.log('Something was clicked')
  }

  /**
   * Event Handler: When the user clicks on the 'CHATS' button
   * - First hides the navigation bar from the user
   * - Second shows the SideBar component to the user
   */
  handleSideBarClick () {
    // Hide the navigation bar
    this.setState({showNavBar: false})
    // Show the side bar
    this.setState({showSideBar: true})
  }

  /**
   * Event Handler: When the user clicks on the 'NEW' chatroom button
   * - First hide the navigation bar from the user
   * - Second shows the createChat component to the user
   */
  handleCreateChatClick () {
    // Hide the navigation bar
    this.setState({showNavBar: false})
    // Show the side bar
    this.setState({showCreateChat: true})
  }

  /**
   * Show the StartChatModal and get a username from the user
   */
  handleStartChat () {
    this.setState({showStartChatModal: true})
  }

  /**
   * Event Handler: Save the name of the
   * new chatroom that the user typed
   * @param {object} event
   */
  textChangeHandler (event) {
    this.setState({newChatRoom: event.target.value})
  }

  /**
   * Event Handler: Save the name of the new user to be added
   * new chatroom that the user typed
   * @param {object} event
   */
  userChangeHandler (event) {
    console.log(event.target.value)
    this.setState({username: event.target.value})
  }

  /**
   * Handle the cancel button for the side bar and CreateChat modal
   */
  handleClose () {
    this.setState({showNavBar: true})
    this.setState({showSideBar: false})
    this.setState({showCreateChat: false})
  }

  /**
   * Hide ONLY the StartChatModal if the client does not
   * provide a username
   */
  handleCloseStartChatModal () {
    this.setState({showStartChatModal: false})
  }

  submitHandler (event) {
    // First get the chat input
    event.preventDefault()
    let newChatRoom = {name: this.state.newChatRoom}
    // Make an HTTP put request to the server to
    // make a new chat room
    fetch('/api/chatrooms', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newChatRoom)
    })
    // Now update the state
    let chatrooms = this.state.chatrooms
    chatrooms.push(newChatRoom)
    this.setState({
      chatrooms: chatrooms,
      newChatRoom: '',
      showNavBar: true,
      showCreateChat: false
    })
  }

  render () {
    let imageDir = path.join('images', 'background.jpg')
    imageDir = 'https://nameless-river-14287.herokuapp.com/' + imageDir
    return (
      <div className='App'>

        { this.state.showSideBar ? <SideBar
          username={this.state.username}
          chatrooms={this.state.chatrooms}
          handleClick={this.handleClick}
          handleClose={this.handleClose}
        /> : null }

        {this.state.showCreateChat ? <CreateChat
          submitHandler={this.submitHandler}
          textChangeHandler={this.textChangeHandler}
          newChatRoom={this.newChatRoom}
          handleClose={this.handleClose}
        /> : null}

        {this.state.showStartChatModal ? <StartChatModal
          submitHandler={this.handleAddUser}
          textChangeHandler={this.userChangeHandler}
          handleClose={this.handleCloseStartChatModal}
        /> : null}

        {this.state.showNavBar ? <div className='w3-bar w3-top' id='myNavbar'>
          <div className='w3-bar-item w3-button w3-large all-white'
            onClick={this.handleSideBarClick}>
            <i className='fa fa-comments' />CHATS
          </div>
          <div className='w3-bar-item w3-button w3-large all-white'
            onClick={this.handleCreateChatClick}>
            <i className='fa fa-plus-circle' />NEW
          </div>
        </div> : null}

        <div className='parallax' style={{backgroundImage: `url('${imageDir}')`}}>
          <div className='w3-display-middle'>
            <div className='rounded w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity'>
              JOE-CHAT
            </div>
            <br />
            <br />
            <br />
            <div className='rounded w3-display-bottommiddle w3-black w3-padding-large w3-button w3-wide w3-animate-opacity'
              onClick={this.handleStartChat}>
              {this.state.startChattingText}
            </div>
          </div>
        </div>
        <p>
          This is really only here to show off the parallax scrolling effect.
        </p>
      </div>
    )
  }
}

export default HomePage
