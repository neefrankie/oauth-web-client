exports.client = {
  client_id: '1acc31b7db001aa88302',
  client_secret: 'b367d4adfb20d21c5969e78e2318edd3a7b77ecabcf32f971ae77a55aaac7181',
  redirect_uri: "http://localhost:3000/callback",
  scope: "article user"
};

exports.token = {
  access_token: null,
  scope: null,
  refresh_token: null
};

exports.endpoints = {
  authorize: 'http://localhost:9001/authorize',
  token: 'http://localhost:9001/token'
};

exports.states = new Map();
