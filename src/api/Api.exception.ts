export interface IApiException {
  message: string;
  statusCode: number;
  response?: any;
}

export class ApiException extends Error {
  constructor(
    message: string,
    public status: number,
    public error: any
  ) {
    super(message);
    this.name = 'ApiException';
    Object.setPrototypeOf(this, ApiException.prototype);
  }
}

export default ApiException;
