exports.client = {
  client_id: '7d749d0f497c009e9e80',
  redirect_uri: "http://localhost:3000/pkce/callback",
  scope: "article user"
};

exports.endpoints = {
  authorize: 'http://localhost:9001/authorize',
  token: 'http://localhost:9001/token'
};

exports.states = new Map();
