exports.client = {
  client_id: '3f25c39435a18218fb87',
  client_secret: '06894d8432f6ba4e17907fe5112e019e515b3f3a',
  redirect_uri: "http://localhost:3000/pkce/callback",
  scope: "article user"
};

exports.endpoints = {
  authorize: 'http://localhost:9001/authorize',
  token: 'http://localhost:9001/token'
};

exports.states = new Map();
