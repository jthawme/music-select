import { get } from "svelte/store";
import api from "./api";
import { db } from "./firebase";
import { isLoggedIn } from "../store/auth";
import { genres, info, albums, getUserRef, loading } from "../store/data";
import { TOP_TAGS } from "../store/constants";

const prepareTag = tag => {
  return tag
    .toLowerCase()
    .split("-")
    .join(" ");
};

export const getUid = (artist, album) => {
  return btoa(`${artist}!@!${album}`);
};

export const IMAGE_SIZES = {
  SMALL: "174s",
  NORMAL: "300x300"
};

export const getImage = (image, size = IMAGE_SIZES.NORMAL) => {
  return `https://lastfm.freetls.fastly.net/i/u/${size}/${image}`;
};

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
            getUserRef().doc("genres"),
            {
              [tagName]: currentGenres[tagName]
            },
            { merge: true }
          );
        }
      });

      batch.set(
        getUserRef()
          .doc("albums")
          .collection("list")
          .doc(uid),
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
  setListening: (artist, album) => {
    checkedLoggedIn();

    const uid = getUid(artist, album);
    const currentListening = get(info).listening;

    if (!currentListening.includes(uid)) {
      const batch = db.batch();

      currentListening.push(uid);

      batch.set(
        getUserRef().doc("info"),
        {
          listening: currentListening
        },
        { merge: true }
      );

      batch.update(
        getUserRef()
          .doc("albums")
          .collection("list")
          .doc(uid),
        {
          lastListened: new Date()
        }
      );

      return batch.commit();
    }

    return Promise.reject("Not listening");
  },
  removeListening: (artist, album) => {
    checkedLoggedIn();

    const currentListening = get(info).listening;
    const uid = getUid(artist, album);
    const uidIndex = currentListening.indexOf(uid);
    currentListening.splice(uidIndex, 1);

    return getUserRef()
      .doc("info")
      .update({
        listening: currentListening
      });
  },
  deleteAlbum: (artist, album) => {
    const uid = getUid(artist, album);

    return getUserRef()
      .doc("albums")
      .collection("list")
      .doc(uid)
      .delete();
  },
  getFromIds: ids => {
    checkedLoggedIn();

    if (ids.length === 0) {
      return Promise.resolve([]);
    }

    return getUserRef()
      .doc("albums")
      .collection("list")
      .where("uid", "in", ids)
      .get()
      .then(query => {
        return query.docs.map(doc => doc.data());
      });
  }
};

export default database;
