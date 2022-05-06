
  var socket = io();

  var messages = document.getElementById('userMessages');
  var form = document.getElementById('userForm');
  var input = document.getElementById('userChat');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      socket.emit('chat group2', input.value);
      input.value = '';
    }
  });

  socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
