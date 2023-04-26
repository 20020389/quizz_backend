import admin from "firebase-admin";
import serviceAccount from "./service_account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const firestore = admin.app().firestore();
export const firestorage = admin.app().storage();
