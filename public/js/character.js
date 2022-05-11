const res = require("express/lib/response")

const getCharacterInformation = () => {
    const id = req.sess.id
    const response = await fetch(`/api/chracters/${id}`, {
        method: 'POST',
        body: JSON.stringify({
          info: 'info'
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