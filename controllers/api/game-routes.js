const router = require('express').Router() ;
const sanitizeHtml = require('sanitize-html');
const {withAuth} = require('../../utils/auth');
const {playerAttack, playerDefend, playerPotion} = require('../../lib/game');
const { Character } = require('../../models');

// Attacking
router.post('/attack', withAuth, async (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);

  try {
    const enemy_id = 1;
    const {character, enemy, new_hp} = await playerAttack(req.session.user_id, enemy_id)

    const enemy_res = {
      "name": enemy.name,
      "attack": enemy.attack,
      "defense": enemy.defense,
      // "image_url": enemy.image_url,
      "hp": new_hp
    }

    const io = req.app.get('socketio');
    const message = sanitizeHtml(`${character.name} damaged ${enemy.name} by ${character.attack - enemy.defense} HP.`)
    io.emit('battle message', message);
    io.emit('battle stats', enemy_res);

    res.status(200).json({message: `Attack successful.`, character: character, enemy: enemy})
   } catch (error) {
    console.log(error);
    res.status(500).json({"Error": "Server error while attempting to attack in game."});
  }
})

// Defending
router.post('/defend', withAuth, async (req, res) => {
  try {    
    const {character, new_flag} = await playerDefend(req.session.user_id)
  
    const character_res = {
      "name": character.name,
      "defend_flag": new_flag
    }

    const io = req.app.get('socketio');
    const message = sanitizeHtml(`${character.name} took a defensive stance!`)
    io.emit('battle message', message);

    res.status(200).json({message: `Defend successful`, character: character, new_flag: new_flag})
   } catch (error) {
    console.log(error);
    res.status(500).json({"Error": "Server error while attempting to defend in game."});
  }
})

// Using Potion
router.post('/potion', withAuth, async (req, res) => {
  try {
    const {character, add_hp} = await playerPotion(req.session.user_id)

    const character_res = {
      "name": character.name,
      "add_hp": add_hp
    }

    const io = req.app.get('socketio');
    const message = sanitizeHtml(`${character.name} used potion and gained ${add_hp} HP.`)
    io.emit('battle message', message);

    res.status(200).json({message: `Item successful.`, character: character, add_hp: add_hp})
   } catch (error) {
    console.log(error);
    res.status(500).json({"Error": "Server error while attempting to item in game."});
  }
})



module.exports = router;
