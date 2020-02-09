import { writable, get } from "svelte/store";

import { userInfo, isLoggedIn, hydratedData } from "./auth";
import { db } from "../utils/firebase";

export const genres = writable({});
export const albums = writable({});
export const info = writable({
  listening: []
});

const getUserId = () => get(userInfo).id;
const getUserRef = () => db.collection(getUserId());

let autoSaveTimer = 0;

export function saveData() {
  clearTimeout(autoSaveTimer);
  const restart = () => (autoSaveTimer = setTimeout(() => saveData(), 2500));

  if (!get(isLoggedIn) || !get(hydratedData)) {
    restart();
    return false;
  }

  return Promise.all([
    getUserRef()
      .doc("genres")
      .set(get(genres)),
    getUserRef()
      .doc("albums")
      .set(get(albums)),
    getUserRef()
      .doc("info")
      .set(get(info))
  ]).then(() => {
    restart();
    return true;
  });
}

export function subscribeData() {
  saveData();
}

export async function populateStores() {
  Promise.all([
    getUserRef()
      .doc("genres")
      .get(),
    getUserRef()
      .doc("albums")
      .get(),
    getUserRef()
      .doc("info")
      .get()
  ]).then(([genresDoc, albumsDoc, infoDoc]) => {
    genresDoc.exists && genres.set(genresDoc.data());
    albumsDoc.exists && albums.set(albumsDoc.data());
    infoDoc.exists && info.set(infoDoc.data());
  });
}
