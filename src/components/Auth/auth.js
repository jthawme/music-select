import { writable } from "svelte/store";
import firebase from "./firebase";

export const hasResolvedLogin = writable(false);
export const isLoggedIn = writable(false);
export const userInfo = writable(null);
export const userToken = writable(null);

export const TOKEN_KEY = "music-select-token";

firebase.auth().onAuthStateChanged(
  user => {
    hasResolvedLogin.set(true);
    isLoggedIn.set(!!user);
    if (user) {
      userInfo.set({
        name: user.displayName
      });

      user.getIdToken().then(accessToken => userToken.set(accessToken));
    } else {
      console.log("user signed out");
    }
  },
  error => {
    console.log("auth error", error);
  }
);

userToken.subscribe(value => localStorage.setItem(TOKEN_KEY, value));
