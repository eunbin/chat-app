module.exports = {
  list: [
    {
      title: 'Moon',
      roomId: '1',
      members: [],
    },
    {
      title: 'Mercury',
      roomId: '2',
      members: [],
    },
    {
      title: 'Mars',
      roomId: '3',
      members: [],
    },
    {
      title: 'Earth',
      roomId: '4',
      members: [],
    },
    {
      title: 'Pluto',
      roomId: '5',
      members: [],
    },
    {
      title: 'Uranus',
      roomId: '6',
      members: [],
    },
  ],
  getRooms() {
    return this.list;
  },
  addMember(roomId, userInfo) {
    this.list.forEach((obj) => {
      if (obj.roomId === roomId) {
        obj.members.push(userInfo);
      }
    });
  },
  getMembers(roomId) {
    return this.list.find(obj => obj.roomId === roomId).members;
  },
  deleteMemeber(roomId, userId) {
    this.list.forEach((obj) => {
      if (obj.roomId === roomId) {
        obj.members.splice(obj.members.findIndex(item => item.userId === userId), 1);
      }
    });
  },
};
