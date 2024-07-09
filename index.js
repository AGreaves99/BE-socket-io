import { Server } from 'socket.io';
import { getEventMessages } from './api.js';

const io = new Server({
  cors: {
    origin: ['http://localhost:8081']
  }
});

io.on('connection', (socket) => {
  console.log(`connected: ${socket.id} \n`);

  socket.on('chat-message', message => {
    console.log('Server will emit the following message:', message, "\n");
    console.log('Updating the database...')
    io.emit('receive-message', message)
  })
});


io.listen(3000);
