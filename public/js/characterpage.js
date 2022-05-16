async function CharacterInfoPage() {

    const response = await fetch(`/api/characters/1`, {
        method: 'GET',
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
