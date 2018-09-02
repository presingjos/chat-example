import React from 'react'
import { Link } from 'react-router-dom'
import '../w3.css'
import 'font-awesome/css/font-awesome.min.css'

class SideBar extends React.Component {
  /**
   * Render the SideBar
   * A cancel button will be the first item
   * Followed by each chatroom defined in
   * the properties
   */
  render () {
    return (
      <div className='w3-sidebar w3-black w3-animate-left'>
        <div className='w3-bar-item w3-button w3-large w3-right w3-red'
          onClick={this.props.handleClose}>
          X
        </div>
        <ul className='w3-ul'>
          {chatroomList(this.props.chatrooms, this.props.username)}
        </ul>
      </div>
    )
  }
}

/**
 * Create a list of buttons that link to each chatroom
 * @param {list} chatrooms - A list of chatroom objects
 * @param {callback} onClick - An event handler when a chatroom
 *                             button is clicked.
 */
const chatroomList = (chatrooms, username) => {
  // console.log(username)
  return chatrooms.map((room, index) =>
    <li key={index}>
      <div className='w3-bar-item'>
        <Link to={{
          pathname: `/chatrooms/${room.name}`,
          username: username
        }} style={{ textDecoration: 'none' }}>
          <button className='w3-button w3-block'>
            {room.name}
          </button>
        </Link>
      </div>
    </li>)
}

export default SideBar
