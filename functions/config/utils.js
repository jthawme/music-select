import * as admin from "firebase-admin";

import { RESPONSES } from "./constants";

export const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  }),
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
