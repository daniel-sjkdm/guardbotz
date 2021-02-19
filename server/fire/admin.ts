import admin from "firebase-admin";
import config from "config";

const serviceAccount: admin.ServiceAccount = config.get(
	"FIREBASE.SERVICE_ACCOUNT"
);
const databaseURL: string = config.get("FIREBASE.CLIENT.databaseURL");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: databaseURL,
});

const db = admin.database();

export { admin, db };
