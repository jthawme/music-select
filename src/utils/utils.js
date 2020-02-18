import { get } from "svelte/store";
import { userInfo } from "../store/auth";
import { db } from "./firebase";
import {
  IMAGE_SIZES,
  SPOTIFY_IMPORT_STATE,
  SPOTIFY_CLIENT_ID,
  PROVIDER_TYPES
} from "./constants";

/**
 * Way to unify tags
 *
 * @param {string} tag
 */
export const prepareTag = tag => {
  return tag
    .toLowerCase()
    .split("-")
    .join(" ");
};

/**
 * Method to create a unified unique id
 *
 * @param {string} artist
 * @param {string} album
 */
export const getUid = (artist, album) => {
  return btoa(`${artist}!@!${album}`.toLowerCase());
};

/**
 * Forms last fm image
 *
 * @param {string} image 123456.png
 * @param {IMAGE_SIZES} size
 */
export const getImage = (
  image,
  { provider = PROVIDER_TYPES.LAST_FM, size = IMAGE_SIZES.NORMAL } = {}
) => {
  switch (provider) {
    case PROVIDER_TYPES.LAST_FM:
      return `https://lastfm.freetls.fastly.net/i/u/${size}/${image}`;
    case PROVIDER_TYPES.SPOTIFY:
    default:
      return image;
  }
};

/**
 * Returns current user id
 */
export const getUserId = () => get(userInfo).id;

/**
 * Returns ref for user db
 */
export const getUserRef = () => db.collection(getUserId());

export const getAlbumsCollection = () => {
  return getUserRef()
    .doc("albums")
    .collection("list");
};

export const getGenresDocument = () => {
  return getUserRef().doc("genres");
};

export const getInfoDocument = () => {
  return getUserRef().doc("info");
};

/**
 * Subscribe to document reference
 *
 * @param {string|string[]} key
 * @param {function} modify
 */
export function listenToRef(key, modify) {
  const ref = Array.isArray(key)
    ? getUserRef()
        .doc(key[0])
        .collection(key[1])
    : getUserRef().doc(key);

  ref.onSnapshot(doc => {
    modify(doc);
  });
}

/**
 * Gets random value from array
 *
 * @param {array} arr
 */
export function randomValue(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

export function getSpotifyUrl() {
  const redirect_uri = encodeURIComponent(`${window.location.origin}/import`);

  const scopes = ["user-library-read"].join(" ");
  const importState = Math.round(Math.random() * 999999);

  localStorage.setItem(SPOTIFY_IMPORT_STATE, importState);
  return `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&state=${importState}`;
}
