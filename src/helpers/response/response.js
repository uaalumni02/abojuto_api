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

export { responseBadRequest, responseOkCreated, responseServerError };
