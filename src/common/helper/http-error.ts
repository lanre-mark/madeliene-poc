import {HTTPErrorType} from '../types';
/**
 *
 * @param {number} status
 * @return {}
 */
function resolveErrorType(status: number): HTTPErrorType {
  if (status >= 100 && status < 200) return HTTPErrorType.Information;
  else if (status < 300) return HTTPErrorType.Success;
  else if (status < 400) return HTTPErrorType.Redirect;
  else if (status < 500) return HTTPErrorType.Client;
  else if (status < 600) return HTTPErrorType.Server;
  else throw new Error(`Unknown HTTP status code ${status}`);
}

/** @param {HTTPErrorType} kind */
class HTTPError extends Error {
  type: any;
  /**
   *
   * @param info
   * @param message
   */
  constructor(info: Response, message: string) {
    super(
      `HTTPError [status: ${info.statusText} (${info.status})]\n${message}`,
    );
    this.type = resolveErrorType(info.status);
  }
}

export default HTTPError;