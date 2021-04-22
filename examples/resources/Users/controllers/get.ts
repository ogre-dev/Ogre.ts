import Context from 'lib/Context';

const get = async (context: Context) => {
  const { response } = context;

  response
    .setBody({
      users: [
        {
          userId: 1,
          username: 'username',
        },
      ],
    });
};

export default get;
