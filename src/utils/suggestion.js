import { get } from "svelte/store";
// import { db } from "./firebase";
import { sortedAlbums } from "../store/data";
import { randomValue } from "./utils";
// import { getUserRef } from "./constants";

export const SUGGESTION_TYPES = {
  RANDOM: "RANDOM",
  NOT_LISTENED: "NOT_LISTENED",
  LISTENED: "LISTENED"
};

function getRandomType() {
  return randomValue(Object.values(SUGGESTION_TYPES));
}

function notListeningAlbums() {
  return get(sortedAlbums).filter(album => !album.isListening);
}

function getAlbum(type) {
  switch (type) {
    case SUGGESTION_TYPES.NOT_LISTENED:
      return Promise.resolve(
        randomValue(
          notListeningAlbums().filter(album => album.lastListened === null)
        )
      );
    case SUGGESTION_TYPES.LISTENED:
      return Promise.resolve(
        randomValue(notListeningAlbums().filter(album => album.lastListened))
      );
    case SUGGESTION_TYPES.RANDOM:
    default:
      return Promise.resolve(randomValue(notListeningAlbums()));
  }
}

function validType(type) {
  return Object.values(SUGGESTION_TYPES).indexOf(type);
}

export function getSuggestion(suggestionOptions) {
  const type = validType(suggestionOptions.type)
    ? suggestionType
    : getRandomType();

  return getAlbum(type).then(album => {
    return {
      album,
      type
    };
  });
}
