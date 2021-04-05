import { IncomingMessage } from 'http';

class Request {
  private incomingMessage: IncomingMessage;

  constructor(incomingMessage: IncomingMessage) {
    this.incomingMessage = incomingMessage;
    console.log(this.incomingMessage.headers);
  }

  /*
  private parseBody = async (request: IncomingMessage): Promise<JSONBody> => new Promise(
    (resolve, reject) => {
      const body: Uint8Array[] = [];

      request
        .on('error', (error) => reject(error))
        .on('data', (chunk: Uint8Array) => body.push(chunk))
        .on('end', () => {
          try {
            const bodyBuffer = Buffer.concat(body).toString();

            const jsonBody = bodyBuffer.length > 0 ? JSON.parse(bodyBuffer) : undefined;

            resolve(jsonBody);
          } catch (error) {
            reject(error);
          }
        });
    },
  );
  */
}

export default Request;
