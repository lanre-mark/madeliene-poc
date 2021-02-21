import { stringifyErrorDescription, HTTPError} from '../helper';

/**
 *
 * @param input Request Input Parameters
 * @param init Optional Initial Parameters 
 */
async function apiCall(input: RequestInfo, init?: RequestInit) {
  try {
    const response = await fetch(input, init);
    const responseJSON = await response.json();
    return { response, json: responseJSON };
  } catch (err) {
    throw new Error(
      stringifyErrorDescription(
        `API Server: An error was encountered while fetching ${JSON.stringify(
          input,
        )}`,
        err,
      ),
    );
  }
}


/**
 *
 * @param endpoint Enpoint/Path for request
 * @param (init) Optional Initial request parameters
 */
export async function requestData(endpoint: string = 'http://localhost:8000/parts', init?: RequestInit) {
  let response;
  let json;
  try {
    const jsonRespInfo = await apiCall(endpoint, init);
    response = jsonRespInfo.response;
    json = jsonRespInfo.json;
  } catch (err) {
    if (err instanceof HTTPError) throw err;
    throw new Error(
      stringifyErrorDescription(
        `API Server: An error was encountered while making api call to ${endpoint}`,
        err,
      ),
    );
  }
  if (!response.ok)
    throw new HTTPError(response, 'Problem while making API call');
  return json;
}