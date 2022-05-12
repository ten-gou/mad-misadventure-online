const socket = io();
const gameMessages = document.getElementById('gameMessages');

socket.on('battle message', function(msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  const scrollAfter = nearBottom(gameMessages);
  gameMessages.appendChild(item);

  if(scrollAfter){
    gameMessages.scrollTo(0,gameMessages.scrollHeight);
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