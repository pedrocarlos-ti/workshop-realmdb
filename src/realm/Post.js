class Post {
  static schema = {
    name: 'Post',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      description: 'string',
      likes: { type: 'int', default: 0 },
    },
  };
}

export default Post;
