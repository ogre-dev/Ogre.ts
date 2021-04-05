import { ServerResponse } from 'http';

class Response {
  private serverResponse: ServerResponse;

  constructor(serverResponse: ServerResponse) {
    this.serverResponse = serverResponse;
  }
}

export default Response;
