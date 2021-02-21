/**
 * Format an Error instance 
 * @param error - The error to stringify
 */
const stringifyErrorInstance = (error: Error): string => {
  return `${error.name.toUpperCase()}: ${error.message} 
  ${error.stack || '(no stack trace information)'}`;
}

/**
 * Format Error description from error instance thrown
 *
 * @param errorDescription
 * @param error
 *
 */
export function stringifyErrorDescription(errorDescription: string, error: any): string {
  return `${errorDescription}\n${
    error instanceof Error
      ? stringifyErrorInstance(error)
      : error
      ? '' + error
      : '(missing error information)' // Error not described and missing types to determine error
  }`;
}