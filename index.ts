import HttpStatusCode from 'enums/HttpStatusCode';
import Ogre from './Ogre';

const onion = new Ogre();

onion
  .addLayer(async (context) => {
    const { response } = context;

    response
      .setStatus(HttpStatusCode.OK)
      .setBody({ userId: 'blablabla' });
  });

const port = 3000;

onion.listen(port, () => console.log(`server listening on port ${port}...`));
