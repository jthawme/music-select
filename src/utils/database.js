import { get } from "svelte/store";

import api from "./api";
import { db } from "./firebase";
import { prepareTag } from "./utils";

import { isLoggedIn } from "../store/auth";
import { genres, listening, loading, albums } from "../store/data";

import {
  getUid,
  getAlbumsCollection,
  getGenresDocument,
  getInfoDocument
} from "./utils";
import { TOP_TAGS, PROVIDER_TYPES } from "./constants";

const checkedLoggedIn = () => {
  if (!get(isLoggedIn)) {
    throw new Error("Not logged in");
  }
};

export function addTags(batch, uid, tags) {
  const currentGenres = get(genres);
  tags.forEach(tag => {
    if (TOP_TAGS.includes(tag)) {
      if (!currentGenres[tag]) {
        currentGenres[tag] = [];
      }

      if (!currentGenres[tag].includes(uid)) {
        currentGenres[tag].push(uid);
      }

      batch.set(
        getGenresDocument(),
        {
          [tag]: currentGenres[tag]
        },
        { merge: true }
      );
    }
  });
}

export function addAlbum(batch, id, provider, artist, album, image, tags) {
  const uid = getUid(artist, album);

  if (get(albums).find(album => album.uid === uid)) {
    return;
  }

  addTags(batch, uid, tags);

  batch.set(
    getAlbumsCollection().doc(uid),
    {
      uid: uid,
      id,
      provider,
      name: album,
      artist,
      image,
      lastListened: null,
      dateAdded: new Date()
    },
    { merge: true }
  );
}

const database = {
  addAlbum: (mbid, artist, album) => {
    checkedLoggedIn();
    loading.set(true);
    return api.info(mbid, artist, album).then(albumInfo => {
      const batch = db.batch();

      addAlbum(
        batch,
        mbid,
        PROVIDER_TYPES.LAST_FM,
        albumInfo.artist,
        albumInfo.name,
        albumInfo.image[0]["#text"].split("/").pop(),
        albumInfo.tags.tag.map(tag => prepareTag(tag.name))
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

    if (currentListening.includes(uid)) {
      return Promise.reject("Not listening");
    }

    return api
      .info(null, artist, album)
      .then(albumInfo => {
        const batch = db.batch();
        const genres = albumInfo.tags.tag.map(tag => prepareTag(tag.name));
        addTags(batch, uid, genres);

        return batch;
      })
      .then(batch => {
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
      });
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
