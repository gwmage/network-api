import React from 'react';

type ErrorDisplayProps = {
  error: string | null | { response?: { data?: { message?: string } } } | Error;
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  let errorMessage = 'An error occurred.';

  if (error && error.response && error.response.data && error.response.data.message) {
    errorMessage = error.response.data.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return <p style={{ color: 'red' }}>{errorMessage}</p>;
};

export default ErrorDisplay;