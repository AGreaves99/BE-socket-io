import { Server } from 'socket.io';
import { postNewMessage } from './api.js';

const io = new Server({
  cors: {
    origin: 'http://localhost:8081',
  }
});

io.on('connection', (socket) => {
  console.log(`connected: ${socket.id} \n`);

  socket.on('chat-message', (message, room) => {
    socket.to(room).emit('receive-message', message)
    console.log('Updating the database...')
    postNewMessage(message, room).then((message) => {
      console.log("DB updated successfully")
    })
  })

  socket.on('join-room', room => {
    socket.join(room)
  })
});


io.listen(3000);
