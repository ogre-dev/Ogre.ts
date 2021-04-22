import HttpStatusCode from 'enums/HttpStatusCode';
import { internalServerErrorHandler, notFoundHandler } from 'examples/errorHandlers';
import Users from 'examples/resources/Users';
import Ogre from './Ogre';

const onion = new Ogre();

onion
  .addLayer(internalServerErrorHandler)
  .addLayer(Users)
  .addLayer(async (context) => {
    const { response } = context;

    response
      .setStatus(HttpStatusCode.OK)
      .setBody({ userId: 'blablabla' });
  })
  .addLayer(notFoundHandler);

const port = 3000;

onion.listen(port, console.log(`server listening on port ${port}...`));
