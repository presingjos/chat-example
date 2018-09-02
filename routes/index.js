const express = require('express')
const router = express.Router()
const path = require('path')

let chatRooms = [
  {
    name: 'Example-Chat',
    messages: []
  }
]

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

router.get('/api/chatrooms', (req, res, next) => {
  // And insert something like this instead:
  res.json(chatRooms)
})

router.post('/api/chatrooms', (req, res, next) => {
  let newChatRoom = {
    name: req.body.name,
    messages: []
  }
  chatRooms.push(newChatRoom)
  res.send('Put correct code here')
})

router.get('/api/chatrooms/:name', (req, res, next) => {
  let name = req.params.name
  let room = {}
  for (let i = 0; i < chatRooms.length; ++i) {
    room = chatRooms[i]
    if (room.name === name) {
      break
    }
  }
  // TODO: Handle if the requested chatroom does not exist
  res.json(room)
})

router.post('/api/chatrooms/:name', (req, res, next) => {
  let name = req.params.name
  let newMessage = req.body.message
  let username = req.body.username
  let room = {}

  // Find the apropiate room
  for (let i = 0; i < chatRooms.length; ++i) {
    room = chatRooms[i]
    if (room.name === name) {
      break
    }
  }
  room.messages.push({
    message: newMessage,
    username: username
  })
  res.send('Put correct code here')
})

module.exports = router
