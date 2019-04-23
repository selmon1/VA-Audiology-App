abstract class APIError extends Error {
    constructor(...params) {
        super(...params);
    }
    abstract httpStatus(): number;
}
export class AuthenticationFailure extends Error {
    constructor(...params) {
        super(...params);
    }
    httpStatus(): number { return 403; }
}
export class AuthenticationExpired extends Error {
    constructor(...params) {
        super(...params);
    }
    httpStatus(): number { return 401; }
}
export class PermissionFailure extends Error {
    constructor(...params) {
        super(...params);
    }
    httpStatus(): number { return 403; }
}

export function defaultErrorHandler(request, response, ex) {
    let httpStatus: number;
    let message: string;
    if (ex instanceof APIError) {
        httpStatus = ex.httpStatus();
        message = ex.toString();
    } else {
        httpStatus = 500;
        message = "Unknown error: " + ex.toString();
    }
    response.status(httpStatus).json({
        "status": "error",
        "message": message,
    });
}
