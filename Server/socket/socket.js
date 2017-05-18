
import Messages from '../models/messages.models';


export default (socket) => {
  console.log('a user connected');
  socket.on('room-connect', (roomId, fn) =>{
    console.log('joined room: ', roomId);
    socket.join(roomId);
    Messages.find({queueID: roomId},'name text sender time', (err, messages) => {

      if (err) throw err;
      fn({messages});

    });
  });
  socket.on('chat message', (message, fn) => {
    socket.broadcast.to(message.queueID).emit('chat message', message);
    let newMessage = {
      queueID: message.queueID,
      text: message.message,
      sender: message.sender,
      time: message.time
    };

    let messages = new Messages(newMessage);

    messages.save(function(err) {
      if (err) throw err;

    });
  });
};