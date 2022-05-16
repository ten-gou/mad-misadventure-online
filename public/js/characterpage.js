async function CharacterInfoPage() {

    const userid = await getUserById(req.sessions.user_id);
    if (!userid) {
        res.status(404).json({ message: "Unable to get user with given id" });
    }
    else {
        console.log(userid);
    }

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
