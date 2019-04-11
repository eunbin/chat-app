const rooms = require('./model/rooms');

const socket = (io) => {
  const activeUserList = [];

  const setUserInfo = (userId, socketId) => ({ userId, socketId });

  const setResultData = (isSuccess, data) => (!isSuccess ? {
    isSuccess,
    description: data,
  } : {
    isSuccess,
    ...data,
  });

  const checkDuplicatedId = id => activeUserList.some(obj => obj.userId === id);

  io.on('connection', async (socket) => {
    console.log('Socket connected', socket.id);

    socket.on('login', (userId, callback) => {
      console.log(`Client logged-in:\n userId:${userId}`);

      if (checkDuplicatedId(userId)) {
        callback(setResultData(false, 'A user with the same ID exists. Please use a different ID.'));
      }

      socket.userId = userId;

      const userInfo = setUserInfo(userId, socket.id);
      activeUserList.push(userInfo);

      callback(setResultData(true, {
        description: 'Login Success',
        roomList: rooms.getRooms(),
        userInfo,
      }));
    });

    socket.on('logout', (userId, callback) => {
      console.log(`Client logout:\n userId:${userId}`);

      activeUserList.splice(activeUserList.findIndex(item => item.userId === userId), 1);
      socket.userid = null;

      callback(setResultData(true, {
        description: 'Logout Success',
      }));
    });

    socket.on('join', (roomId) => {
      console.log(`Client join-in:\n userId: ${socket.userId}, roomId: ${roomId}`);

      socket.join(roomId);
      socket.roomId = roomId;

      rooms.addMember(socket.roomId, setUserInfo(socket.userId, socket.id));

      io.to(socket.roomId).emit('join', setResultData(true, {
        userId: socket.userId,
        message: `${socket.userId} 님이 접속했습니다.`,
      }));
    });

    socket.on('leave', () => {
      console.log(`Client leave:\n roomId: ${socket.roomId} userId: ${socket.userId}`);

      socket.leave(socket.roomId);
      rooms.deleteMemeber(socket.roomId, socket.userId);

      io.to(socket.roomId).emit('leave', setResultData(true, {
        userInfo: setUserInfo(socket.userId, socket.id),
        message: `${socket.userId} 님이 채팅방을 나갔습니다.`,
      }));

      socket.roomId = null;
    });

    socket.on('chat', (data) => {
      console.log(`Message from ${socket.userId}, message: ${data.message}, roomId: ${socket.roomId}`);
      socket.broadcast.to(socket.roomId).emit('chat', setResultData(true, {
        ...data,
      }));
    });

    socket.on('image', (data) => {
      console.log(`Image file uploaded: ${data.fileName}`);

      socket.broadcast.to(socket.roomId).emit('image', setResultData(true, {
        ...data,
      }));
    });

    socket.on('invite', (userInfo) => {
      console.log(`userId: ${socket.userId} invites userId: ${userInfo.userId} to ${socket.roomId}`);

      io.to(userInfo.socketId).emit('invite', setResultData(true, {
        from: {
          userId: socket.userId,
        },
        to: {
          userId: userInfo.userId,
        },
        room: {
          roomId: socket.roomId,
        },
      }));
    });

    socket.on('inviteAvailableUsers', (roomId, callback) => {
      console.log(`List of users you can invite: ${activeUserList} to ${roomId}`);
      const flatMapReducer = (accumulator, value) => {
        const key = 'members';
        if (Object.prototype.hasOwnProperty.call(value, key) && Array.isArray(value[key])) {
          value[key].forEach((val) => {
            if (accumulator.indexOf(val) === -1) {
              accumulator.push(val);
            }
          });
        }
        return accumulator;
      };
      const flattenMembers = rooms.getRooms().reduce(flatMapReducer, []);
      callback(setResultData(true, {
        userList: activeUserList.filter(obj => !flattenMembers.find(member => member.userId === obj.userId)),
      }));
    });

    socket.on('forceDisconnect', () => {
      console.log('Force disconnect');
      socket.disconnect();
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = socket;
