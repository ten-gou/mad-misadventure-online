
const updateCharaButton = document.getElementById('updateCharacterButton');

async function updateCharacterInformation() {
    
    const characterName = document.getElementById('charactername').value.trim();

    const userid = await getUserById(req.sessions.user_id);
    if (!userid) {
        res.status(404).json({ message: "Unable to get user with given id" });
    }
    else {
        console.log(userid)
    }

    const response = await fetch(`/api/characters/:id`, {
        method: 'PUT',
        where: {
            id: userid
        },
        body: JSON.stringify({
            name: characterName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

    if (response.ok) {
        console.log(response)
    } else {
        alert(response.statusText);
    }  

}

updateCharaButton.addEventListener('click', updateCharacterInformation);