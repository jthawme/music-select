const ENDPOINT_PREFIX = "/.netlify/functions";

const safeFetch = (route, args = {}) => {
  const query = Object.entries(args)
    .map(pair => pair.join("="))
    .join("&");

  return fetch([ENDPOINT_PREFIX, route, `?`, query].join(""))
    .then(resp => resp.json())
    .catch(err => {
      console.error("API Error", err);
      throw err;
    });
};

const api = {
  search: (artist, album) => {
    return safeFetch("/search", { artist, album });
  }
};

export default api;
