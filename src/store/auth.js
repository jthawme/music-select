import { writable, get } from "svelte/store";
import firebase from "../utils/firebase";
import { albums, listening, genres } from "./data";
import { listenToRef } from "../utils/utils";
import { TOKEN_KEY } from "../utils/constants";

export const hasResolvedLogin = writable(false);
export const isLoggedIn = writable(false);
export const userInfo = writable(null);
export const userToken = writable(null);
export const hydratedData = writable(false);

function setUserInfo(user) {
  userInfo.set({
    id: user.uid,
    name: user.displayName,
    image: user.photoURL
  });
}

function subscribeToRefs() {
  listenToRef(["albums", "list"], query => {
    albums.set(query.docs.map(doc => doc.data()));
  });

  listenToRef("genres", doc => {
    if (doc.exists) {
      genres.set(doc.data());
    }
  });

  listenToRef("info", doc => {
    if (doc.exists) {
      const data = doc.data();
      listening.set(data.listening);
    }
  });
}

firebase.auth().onAuthStateChanged(
  user => {
    hasResolvedLogin.set(true);
    isLoggedIn.set(!!user);

    if (user) {
      setUserInfo(user);

      if (!get(hydratedData)) {
        user
          .getIdToken()
          .then(accessToken => userToken.set(accessToken))
          .then(() => {
            hydratedData.set(true);
            subscribeToRefs();
          });
      }
    } else {
      console.log("user signed out");
    }
  },
  error => {
    console.log("auth error", error);
  }
);

// store the token to localStorage
userToken.subscribe(value => localStorage.setItem(TOKEN_KEY, value));
