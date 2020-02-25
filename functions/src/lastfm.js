import axios from "axios";

const API_BASE = "https://ws.audioscrobbler.com/2.0/";

const METHODS = {
  SEARCH: "album.search",
  INFO: "album.getinfo"
};

export const queryBuilder = args => {
  return Object.entries(args)
    .map(pair => pair.join("="))
    .join("&");
};

const urlBuilder = (method, args) => {
  const query = queryBuilder({
    ...args,
    method,
    api_key: process.env.LASTFM_KEY,
    format: "json"
  });

  return [API_BASE, query ? `?${query}` : ""].join("");
};

const safeFetch = url => {
  return axios({
    url,
    responseType: "json"
  }).then(resp => resp.data);
};

export const searchAlbum = albumName => {
  return safeFetch(
    urlBuilder(METHODS.SEARCH, {
      album: encodeUriComponent(albumName)
    })
  );
};

export const getAlbumInfo = (mbid, artist, album) => {
  const args = mbid
    ? {
        mbid
      }
    : {
        artist: encodeUriComponent(artist),
        album: encodeUriComponent(album)
      };

  return safeFetch(urlBuilder(METHODS.INFO, args));
};
