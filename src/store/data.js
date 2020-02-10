import { writable, get } from "svelte/store";

import { userInfo, isLoggedIn, hydratedData } from "./auth";
import { db } from "../utils/firebase";

export const genres = writable({});
export const albums = writable([]);
export const info = writable({
  listening: []
});

const getUserId = () => get(userInfo).id;
export const getUserRef = () => db.collection(getUserId());

let autoSaveTimer = 0;

export function saveData() {
  clearTimeout(autoSaveTimer);
  const restart = () => (autoSaveTimer = setTimeout(() => saveData(), 2500));

  if (!get(isLoggedIn) || !get(hydratedData)) {
    restart();
    return false;
  }

  const batch = db.batch();

  batch.set(getUserRef().doc("genres"), get(genres));
  batch.set(getUserRef().doc("info"), get(info));

  const currentAlbums = get(albums);
  currentAlbums.forEach(album => {
    batch.set(
      getUserRef()
        .doc("albums")
        .collection("list")
        .doc(album.uid),
      album
    );
  });

  return batch.commit().then(() => {
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
      .collection("list")
      .get(),
    getUserRef()
      .doc("info")
      .get()
  ]).then(([genresDoc, albumsDoc, infoDoc]) => {
    genresDoc.exists && genres.set(genresDoc.data());
    albums.set(albumsDoc.docs.map(doc => doc.data()));
    infoDoc.exists && info.set(infoDoc.data());
  });
}
