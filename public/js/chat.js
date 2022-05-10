const messages = document.getElementById('userMessages');

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

socket.on('chat message', function(msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  const scrollAfter = nearBottom(messages);
  messages.appendChild(item);

  if(scrollAfter){
    messages.scrollTo(0,messages.scrollHeight);
  }
});

function nearBottom(ele) {
  var st = ele.scrollTop; // Top of the selectable scroll bar location.
  var sh = ele.scrollHeight; // Length of scrollbar.
  var ht = ele.offsetHeight; // Height of element.
  var topOfBar = sh - ht - 50; // sh - ht should equal to length of bar. -50px to see if near bottom, else 0 for at bottom.

  if(ht==0) {
    return true;
  }
  if(st >= topOfBar)
    {return true;} 
  else 
    {return false;}
}