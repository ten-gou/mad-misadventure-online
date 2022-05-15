const chatJS = async function() {

  const form = document.getElementById('userForm');
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const chatInput = document.getElementById('userChat');

    if (chatInput.value) {
      const response = await fetch(`/api/chat`, {
        method: 'POST',
        body: JSON.stringify({
          chat_message: chatInput.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        chatInput.value = ''
        document.getElementById('messageError').innerText = ''
      } else {
        chatInput.value = ''
        response.json()
        .then(data => {
          document.getElementById('messageError').innerText = data.message;
        })
      }
    }

  });
}
chatJS();