const battleJS = async function() {

  function addCombatListeners(){
    const attackBtn = document.getElementById('attackBtn');
    const defendBtn = document.getElementById('defendBtn');
    const potionBtn = document.getElementById('potionBtn');
    attackBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      
      const response = await fetch(`/api/game/attack`, {
        method: 'POST',
        body: JSON.stringify({
          info: 'info'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        document.getElementById('messageError').innerText = ''
      } else {
        response.json()
        .then(data => {
          document.getElementById('messageError').innerText = data.message;
        })
      }
    })
    
    defendBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      
      const response = await fetch(`/api/game/defend`, {
        method: 'POST',
        body: JSON.stringify({
          info: 'info'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        document.getElementById('messageError').innerText = ''
      } else {
        response.json()
        .then(data => {
          document.getElementById('messageError').innerText = data.message;
        })
      }
    })

    potionBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      
      const response = await fetch(`/api/game/potion`, {
        method: 'POST',
        body: JSON.stringify({
          info: 'info'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        document.getElementById('messageError').innerText = ''
      } else {
        response.json()
        .then(data => {
          document.getElementById('messageError').innerText = data.message;
        })
      }
    })
  }
  addCombatListeners();
}

battleJS();