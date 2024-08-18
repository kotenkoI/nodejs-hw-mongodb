import { isHttpError } from 'http-errors';

export function errorHandler(error, _req, res, next) {
  if (isHttpError(error) === true) {
    return res
      .status(error.status)
      .send({ status: error.status, message: error.message });
  }
  res
    .status(500)
    .send({
      status: 500,
      message: 'Something went wrong',
      data: error.message,
    });
}