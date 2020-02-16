import { get } from "svelte/store";

import api from "./api";
import { db } from "./firebase";
import { prepareTag } from "./utils";

import { isLoggedIn } from "../store/auth";
import { genres, listening, loading } from "../store/data";

import {
  getUserRef,
  getUid,
  getAlbumsCollection,
  getGenresDocument,
  getInfoDocument
} from "./utils";
import { TOP_TAGS } from "./constants";

const checkedLoggedIn = () => {
  if (!get(isLoggedIn)) {
    throw new Error("Not logged in");
  }
};

const database = {
  addAlbum: (mbid, artist, album) => {
    checkedLoggedIn();
    loading.set(true);
    return api.info(mbid, artist, album).then(albumInfo => {
      const batch = db.batch();

      const uid = getUid(artist, album);
      const currentGenres = get(genres);
      albumInfo.tags.tag.forEach(tag => {
        let tagName = prepareTag(tag.name);

        if (TOP_TAGS.includes(tagName)) {
          if (!currentGenres[tagName]) {
            currentGenres[tagName] = [];
          }

          if (!currentGenres[tagName].includes(uid)) {
            currentGenres[tagName].push(uid);
          }

          batch.set(
            getGenresDocument(),
            {
              [tagName]: currentGenres[tagName]
            },
            { merge: true }
          );
        }
      });

      batch.set(
        getAlbumsCollection().doc(uid),
        {
          uid: uid,
          id: mbid,
          name: albumInfo.name,
          artist: albumInfo.artist,
          image: albumInfo.image[0]["#text"].split("/").pop(),
          lastListened: null,
          dateAdded: new Date()
        },
        { merge: true }
      );

      return batch.commit().then(() => {
        loading.set(false);
        return true;
      });
    });
  },

  /**
   * Adds album to listening and stores
   * time listened
   *
   * @param {string} artist
   * @param {string} album
   */
  setListening: (artist, album) => {
    checkedLoggedIn();

    const uid = getUid(artist, album);
    const currentListening = get(listening);

    if (!currentListening.includes(uid)) {
      const batch = db.batch();

      currentListening.push(uid);

      batch.set(
        getInfoDocument(),
        {
          listening: currentListening
        },
        { merge: true }
      );

      batch.update(getAlbumsCollection().doc(uid), {
        lastListened: new Date()
      });

      return batch.commit();
    }

    return Promise.reject("Not listening");
  },

  /**
   * Removes album from listening
   *
   * @param {string} artist
   * @param {string} album
   */
  removeListening: (artist, album) => {
    checkedLoggedIn();

    const currentListening = get(listening);
    const uid = getUid(artist, album);
    const uidIndex = currentListening.indexOf(uid);
    currentListening.splice(uidIndex, 1);

    return getInfoDocument().set(
      {
        listening: currentListening
      },
      { merge: true }
    );
  },

  /**
   * Adds album to listening and stores
   * time listened
   *
   * @param {string} artist
   * @param {string} album
   */
  deleteAlbum: (artist, album) => {
    const uid = getUid(artist, album);

    return getAlbumsCollection()
      .doc(uid)
      .delete();
  },

  getFromIds: ids => {
    checkedLoggedIn();

    if (ids.length === 0) {
      return Promise.resolve([]);
    }

    return getAlbumsCollection()
      .where("uid", "in", ids)
      .get()
      .then(query => {
        return query.docs.map(doc => doc.data());
      });
  }
};

export default database;
