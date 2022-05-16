const updateCharacterNameEl = document.getElementById('updateCharacterButton');

async function updateCharacterName() {

    const newName = document.getElementById('charactername').value.trim();
    const currentName = document.getElementById('charactername').getAttribute('value');

    console.log(newName);
    console.log(currentName);

    const response = await fetch(`/api/characters/`, {
        method: 'PUT',
        body: {
            currentName,
            newName,
        },
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

updateCharacterNameEl.addEventListener('click', updateCharacterName)


