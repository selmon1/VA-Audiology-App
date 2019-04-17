// Authentication function: return true if authorized; otherwise throw an exception
function alwaysPermitted(request) {
  return true;
}
//todo move this to authenticate.js
class AuthenticationFailureError extends Error {
  constructor(...params) {
    super(...params);
  }
}
//todo move this to errors.js
//todo handle a lot more errors, with unique messages and statuses
function defaultErrorHandler(request, response, ex) {
  response.status(500).json({
    "status": "error",
    "message": "Unknown error: " + ex.toString()
  });
}
// Factory for API handlers
// Accepts three function, and returns a function that handles the API call
//   perform: Performs the user's request, and returns any requested data (or null)
//   handleErrors: Sends a response based on a thrown exception
//   authenticate: If the request is not authorized, throws an exception
export default function handler(perform, handleErrors = defaultErrorHandler, authenticate = alwaysPermitted) {
  return function(request, response, next) {
    try {
      authenticate(request);
      Promise.resolve(perform(request)).then(data => 
        response.status(200).json({
          "status": "success",
          "data": data
        })
      ).catch(ex => handleErrors(request, response, ex));
    } catch (ex) {
      //currently this doesn't handle errors differently for authenticated users than unauthenticated ones; we may want to ultimately hide some information from unauthenticated users
      handleErrors(request, response, ex);
    }
    return undefined;
  }
}
