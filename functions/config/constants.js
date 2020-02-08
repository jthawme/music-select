export const RESPONSES = {
  NOT_LOGGED_IN: {
    statusCode: 401,
    body: JSON.stringify({
      error: true,
      message: "Not logged in"
    })
  },
  GENERIC: {
    statusCode: 400,
    body: JSON.stringify({
      error: true,
      message: "Error processing request"
    })
  }
};

export const getToken = header => {
  return header ? header.substring("Bearer ".length) : "";
};
