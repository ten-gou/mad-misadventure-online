const res = require("express/lib/response")

const getCharacterInformation = async () => {
    // const id = req.sess.id
    const response = await fetch(`/api/characters/`, {
      method: 'POST',
      body: JSON.stringify({
        name: 'myCharacterName'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    if (response.ok) {
      res.render(response);
    } else {
      response.json()
      .then(data => {
        document.getElementById('messageError').innerText = data.message;
      })
    }
}