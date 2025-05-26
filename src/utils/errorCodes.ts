const ErrorCodes = {
  400: { code: 400, message: 'Bad Request', shortHand: 'Invalid Input' },
  401: { code: 401, message: 'Unauthorized', shortHand: 'Auth Required' },
  403: { code: 403, message: 'Forbidden', shortHand: 'Access Denied' },
  404: { code: 404, message: 'Not Found', shortHand: 'Resource Missing' },
  409: { code: 409, message: 'Conflict', shortHand: 'Duplicate Entry' },
  422: {
    code: 422,
    message: 'Unprocessable Entity',
    shortHand: 'Invalid Data Format',
  },
  500: {
    code: 500,
    message: 'Internal Server Error',
    shortHand: 'Server Issue',
  },
  502: { code: 502, message: 'Bad Gateway', shortHand: 'External API Failure' },
  503: {
    code: 503,
    message: 'Service Unavailable',
    shortHand: 'Try Again Later',
  },
}

export default ErrorCodes
