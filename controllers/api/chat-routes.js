const router = require('express').Router() ;
const sanitize = require('validator').sanitize;

router.post('/', (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    console.log('req.body:', req.body)
    const { chat_message } = req.body;
    const io = req.app.get('socketio');

    const message = sanitize(chat_message).xss()
    io.emit('chat message', message);

    res.status(200).json({message: `Sent chat message.`})
      
   } catch (error) {
    console.log(error);
    res.status(500).json({"Error": "Server error while attempting to send chat."});
  }
})

module.exports = router;
