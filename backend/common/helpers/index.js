


let Helpers = {};

Helpers.IsStringNullOrEmptyOrUndefined = (str) => {
    return str === "" || str === null || str === undefined;
}

Helpers.responseHelper = (res, statusCode, message, data) => {
    return res.status(statusCode).send({
        hasError: !(statusCode >= 200 && statusCode <= 299),
        data: data || {},
        message: message
    });
}

export default Helpers;