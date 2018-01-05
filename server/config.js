exports.client = {
  client_id: '5f73595c1a234088aa19',
  client_secret: '050d35a94867e8dc85c3f422fe29577edb626d30',
  redirect_uri: "http://localhost:9000/callback",
  scope: "read write delete"
};

exports.token = {
  access_token: null,
  scope: null,
  refresh_token: null
};

exports.authServer = {
  authorize: 'http://localhost:9001/oauth/authorize',
  token: 'http://localhost:9001/oauth/access_token'
};

exports.endpoints = {
  authorize: 'http://localhost:9001/oauth/authorize',
  accessToken: 'http://localhost:9001/oauth/access_token'
};


exports.states = new Map();