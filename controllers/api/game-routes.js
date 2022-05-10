const router = require('express').Router() ;
const sanitizeHtml = require('sanitize-html');

// Attacking
router.post('/battle/attack', async (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    console.log('req.body:', req.body)
    
    // TODO: Add attack library calls.
    // attackInfo = 

    const io = req.app.get('socketio');
    const message = sanitizeHtml("User_Name attacked for ???")
    io.emit('battle message', message);

    res.status(200).json({message: `Attack successful.`})
      
   } catch (error) {
    console.log(error);
    res.status(500).json({"Error": "Server error while attempting to attack in game."});
  }
})

// Defending
router.post('/battle/defend', async (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    console.log('req.body:', req.body)
    
    // TODO: Add defend library calls.
    // defendInfo = 

    const io = req.app.get('socketio');
    const message = sanitizeHtml("User_Name defended for ???")
    io.emit('battle message', message);

    res.status(200).json({message: `Defend successful.`})
      
   } catch (error) {
    console.log(error);
    res.status(500).json({"Error": "Server error while attempting to defend in game."});
  }
})

// Using item
router.post('/battle/potion', async (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    console.log('req.body:', req.body)
    
    // TODO: Add item library calls.
    // itemInfo = 

    const io = req.app.get('socketio');
    const message = sanitizeHtml("Item_Name used to heal for ???")
    io.emit('battle message', message);

    res.status(200).json({message: `Item successful.`})
      
   } catch (error) {
    console.log(error);
    res.status(500).json({"Error": "Server error while attempting to item in game."});
  }
})



module.exports = router;