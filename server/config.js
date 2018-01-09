exports.client = {
  client_id: '245c0b3c9ee39b049ee4',
  client_secret: 'f78c369658cfda5f14a323fec87854c4d2446fd8',
  redirect_uri: "http://localhost:9000/callback",
  scope: "read write delete"
};

exports.token = {
  access_token: null,
  scope: null,
  refresh_token: null
};

exports.endpoints = {
  authorize: 'http://localhost:9001/authorize',
  accessToken: 'http://localhost:9001/token'
};

exports.states = new Map();
