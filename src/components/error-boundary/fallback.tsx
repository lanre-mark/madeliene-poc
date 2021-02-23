import React from 'react';

/**
 * 
 * @param param0 Error from any component to be rendered raising an error
 */
const ErrorFallback: React.FunctionComponent<any> = ({error}: {error: Error}) => {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

export default ErrorFallback