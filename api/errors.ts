export class APIError extends Error {
    constructor(...params) {
        super(...params);
        //See https://stackoverflow.com/questions/41102060/typescript-extending-error-class
        //required for instanceof, .constructor.name
        Object.setPrototypeOf(this, new.target.prototype);
    }
    httpStatus(): number { return 500; }
}
export class AuthenticationFailure extends APIError {
    constructor(...params) {
        super(...params);
    }
    httpStatus(): number { return 403; }
}
export class AuthenticationExpired extends APIError {
    constructor(...params) {
        super(...params);
    }
    httpStatus(): number { return 401; }
}
export class PermissionFailure extends APIError {
    constructor(...params) {
        super(...params);
    }
    httpStatus(): number { return 403; }
}
export class MissingParameter extends APIError {
    constructor(...params) {
        super(...params);
    }
    httpStatus(): number { return 400; }
}

export function defaultErrorHandler(request, response, ex) {
    let httpStatus: number;
    let message: string;
    if (ex instanceof APIError) {
        httpStatus = ex.httpStatus();
        message = ex.toString();
    } else {
        console.error(ex);
        httpStatus = 500;
        message = "Unknown error: " + ex.toString();
    }
    response.status(httpStatus).json({
        "status": "error",
        "type": ex.constructor.name,
        "message": message,
    });
}

//Throw an error if any of the listed parameters are not present in the object
//perhaps this should be redesigned to call when you retrieve the parameter instead
export function requireParams(obj: any, paramNames: Array<string>): void {
    paramNames.forEach((name) => {
        if ([null, undefined].includes(obj[name])) {
            throw new MissingParameter("Missing parameter " + name);
        }
    });
}
