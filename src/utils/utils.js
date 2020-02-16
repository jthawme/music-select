import { get } from "svelte/store";
import { userInfo } from "../store/auth";
import { db } from "./firebase";
import { IMAGE_SIZES } from "./constants";

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
  return btoa(`${artist}!@!${album}`);
};

/**
 * Forms last fm image
 *
 * @param {string} image 123456.png
 * @param {IMAGE_SIZES} size
 */
export const getImage = (image, size = IMAGE_SIZES.NORMAL) => {
  return `https://lastfm.freetls.fastly.net/i/u/${size}/${image}`;
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
