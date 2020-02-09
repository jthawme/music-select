export const RESPONSES = {
  NOT_LOGGED_IN: {
    statusCode: 401,
    body: JSON.stringify({
      error: true,
      message: "Not logged in"
    })
  },
  NO_ALBUM: {
    statusCode: 404,
    body: JSON.stringify({
      error: true,
      message: "No album with this information"
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
