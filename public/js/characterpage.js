async function CharacterInfoPage() {
    event.preventDefault();

    const userid = await getUserById(req.sessions.user_id);
    if (!userid) {
        res.status(404).json({ message: "Unable to get user with given id" });
    }
    else {
        console.log(userid)
    }

    const response = await fetch(`/api/characters/${id}`, {
        method: 'GET',
        body: JSON.stringify({
            name,
            level,
            exp,
            hp,
            attack,
            defense,
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