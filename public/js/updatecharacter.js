const updateCharacterNameEl = document.getElementById('updateCharacterButton');

async function updateCharacterName() {

    const newName = document.getElementById('charactername').value.trim();
    const currentName = document.getElementById('charactername').getAttribute('value');

    const response = await fetch(`/api/characters`, {
        method: 'PUT',
        body: JSON.stringify({
            currentName: currentName,
            newName: newName,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        // console.log(response)
    } else {
        console.log("Update Failed!");
    }  
}

updateCharacterNameEl.addEventListener('click', updateCharacterName)


