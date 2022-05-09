const socket = (io) => {
  io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
  socket.on('chat group2', (msg) => {
    console.log('message g2: ' + msg);
  });

     //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
  })
};

module.exports = socket;
