import { ErrorRequestHandler } from 'express';

const handleErrorsMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status) {
        return res.sendStatus(err.status);
    }

    res.sendStatus(500);
};

export default handleErrorsMiddleware;
