import React from 'react'
import {Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatRoom from './pages/ChatRoom'

const App = () => <div>
  <Route path='/' exact component={HomePage} />
  <Route path='/chatrooms/:name' component={ChatRoom} />
</div>

export default App
