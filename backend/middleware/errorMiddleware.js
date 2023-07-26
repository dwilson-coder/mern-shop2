const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.StatusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // check for Mongoose product with non-existing id
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Resource not found.`;
    statusCode = 404;
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🧑‍🏭" : err.stack,
  });
};

export { notFound, errorHandler };
