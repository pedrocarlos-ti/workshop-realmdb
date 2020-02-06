class User {
  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      lastName: 'string?', // { type: 'string?', default: '' },
      nickname: 'string',
      photo: 'string?',
    },
  };
}

export default User;
