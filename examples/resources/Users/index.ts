import Resource from 'lib/Resource';
import get from './controllers/get';

class Users extends Resource {
  constructor() {
    super('/users');
    this.get = get;
  }
}

export default new Users().toLayer();
