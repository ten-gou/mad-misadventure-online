const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
// const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create();
// const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
// app.engine('handlebars');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
const io = require('socket.io')()
// const io = (exphbs);
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   io.listen(3001);
// });
io.on('connection', (socket) => {
  console.log('a user connected');
  // io.listen(3000, () => console.log(`Creating socket`));
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
});
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
// });

sequelize.sync({ force: false }).then(() => {
  const serverInstance = app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
  io.attach(serverInstance)
});
