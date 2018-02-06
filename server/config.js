exports.client = {
  client_id: 'fbaaaef1100071a85fea',
  client_secret: '482e234b180129b5a4553af5441eb51b0616950c',
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
