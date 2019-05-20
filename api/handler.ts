import * as errors from './errors';
// Factory for API handlers
// Accepts three function, and returns a function that handles the API call
//   perform: Performs the user's request, and returns any requested data (or null)
//   authenticate: If the request is not authorized, throws an exception. Otherwise, returns authenticated user id (or null)
//   handleErrors: Sends a response based on a thrown exception
export default function handler(perform, authenticate, handleErrors = errors.defaultErrorHandler) {
    return async function(request, response, next) {
        try {
            const userId = await authenticate(request);
            const data = await perform(request, userId);
            response.status(200).json({
                "status": "success",
                "data": data
            });
        } catch (ex) {
            //currently this doesn't handle errors differently for authenticated users than unauthenticated ones; we may want to ultimately hide some information from unauthenticated users
            handleErrors(request, response, ex);
        }
        return undefined;
    };
}
