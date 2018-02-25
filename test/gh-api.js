const request = require('superagent');
const accessToken = process.env.GH_TOKEN;

console.log("Access token: %s", accessToken);

async function fetch(headers) {
  try {
    const resp = await request.get('https://api.github.com/user')
      .set(headers)
      .retry(0);
    console.log(resp.body);
  } catch (err) {
    console.log("Error Message: %s", err.message);
    console.log("Error Status: %d", err.status);
    console.log("Error response body: %o", err.response.body);
    if (err.status === 401) {
      headers['Authorization'] = `Bearer ${accessToken}`;
      fetch(headers);
    }
  }
}

fetch({
  'Accept': 'application/vnd.github.v3+json'
})
.catch(err => {
  console.log(err);
});