const responseBadRequest = (res, message) => {
  return res.status(400).json({
    success: false,
    message,
  });
};

const responseOkCreated = (res, data) => {
  return res.status(201).json({
    success: true,
    message: "added",
    data,
  });
};
const responseServerError = (res) => {
  return res.status(500).json({
    success: false,
    message: "internal server error",
  });
};
const responseOk = (res, data) => {
  return res.status(200).json({
    success: true,
    data,
  });
};
const responseValidationError = (res, message) => {
  return res.status(400).json({
    success: false,
    message,
  });
};
const responseNotFound = (res, message, data = []) => {
  return res.status(404).json({
    success: false,
    message,
    data
  });
};

export {
  responseBadRequest,
  responseOkCreated,
  responseServerError,
  responseOk,
  responseValidationError,
  responseNotFound
};
