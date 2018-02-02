const endpoint = 'http://localhost:9000/authorize';

const qs = {
  parse(str, sep='&', eq='=') {
    const o = {}
    str.split(sep).forEach(pair => {
      const [name, value] = pair.split(eq);
      o[name] = value;
    });
    return o;
  },

  stringify(obj, sep='&', eq='=') {
    return Object.entries(obj).map(([k, v]) => {
      return `${encodeURIComponent(k)}${eq}${encodeURIComponent(v)}`
    })
    .join(sep);
  }
}

function randomString(length) {
  const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  let values = new Uint32Array(length);
  window.crypto.getRandomValues(values);
  for (let i = 0; i < length; i++) {
    result += pool[values[i] % pool.length];
  }
  return result;
}

function buidlUrl(base, hash) {
  console.log(hash);
  const url = new URL(base);
  url.search = qs.stringify(hash);
  return url.toString();
}

function parseUrl(str) {
  const url = new URL(str);
  return qs.parseUrl(url.hash.substring(1));
}

const query = {
  response_type: 'token',
  client_id: '730d8375191020615f51',
  redirect_uri: 'http://localhost:3000',
  scope: 'article user',
  state: randomString(10)
};

const queryString = qs.stringify(query);
console.log(queryString);
console.log(qs.parse(queryString));

async function requestToken() {
  const requestUrl = buidlUrl(endpoint, query);
  console.log('Request URL: %s', requestUrl);
  const resp = await fetch(requestUrl, {
    headers: {
      'Origin': 'http://localhost:3000'
    },
    mode: 'cors'
  });

  console.log(resp);
  if (resp.ok) {
    console.log(resp.json());
  }
}

document.getElementById('implicit-grant')
  .addEventListener('click', (e) => {
    requestToken()
      .catch(err => {
        console.log(err);
      });
  });
