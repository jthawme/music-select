import * as admin from "firebase-admin";

import { RESPONSES } from "./constants";
import serviceAccount from "./serviceAccount.json";

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://music-select-6b777.firebaseio.com"
});

export const getToken = header => {
  return header ? header.substring("Bearer ".length) : "";
};

export async function loggedInRoute(event) {
  const idToken = getToken(event.headers.authorization);

  if (!idToken) {
    return Promise.resolve({
      error: RESPONSES.NOT_LOGGED_IN
    });
  }

  const decodedToken = await firebase.auth().verifyIdToken(idToken);

  if (!decodedToken) {
    return Promise.resolve({
      error: RESPONSES.NOT_LOGGED_IN
    });
  }

  return Promise.resolve({ decodedToken });
}
