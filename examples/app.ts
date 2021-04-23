import Ogre from '../dist';
import { internalServerErrorHandler, notFoundHandler } from './errorHandlers';
import Users from './resources/Users';

const app = new Ogre();

app
  .addLayer(internalServerErrorHandler)
  .addLayer(Users)
  .addLayer(notFoundHandler);

const port = 3000;

app.listen(port, console.log(`server listening on port ${port}...}`));