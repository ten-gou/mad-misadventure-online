
const createNewCharacter = async () => {
  const characterName = document.getElementById('newCharacterName').value.trim();

  const response = await fetch(`/api/characters/`, {
    method: 'POST',
    body: JSON.stringify({
      name: characterName
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

document.querySelector('#newCharacterForm').addEventListener('submit', createNewCharacter);