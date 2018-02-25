const fetch = require('node-fetch');
const accessToken = process.env.GH_TOKEN;


fetch('https://api.github.com/user', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
  .then(response => {
    console.log(response.headers);
    return response.json()
  })
  .then(body => {
    console.log(body);
  })
  .catch(err => {
    console.error(err);
  })