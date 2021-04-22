import HttpStatusCode from 'enums/HttpStatusCode';
import Layer from 'lib/Layer';

const internalServerErrorHandler: Layer = async (context, next) => {
  try {
    await next();
  } catch (error) {
    const { response } = context;

    response
      .setStatus(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .setBody({ message: 'Internal Server Error' });
  }
};

const notFoundHandler: Layer = async (context) => {
  const { response } = context;

  response
    .setStatus(HttpStatusCode.NOT_FOUND)
    .setBody({ message: 'Not Found' });
};

export {
  internalServerErrorHandler,
  notFoundHandler,
};
