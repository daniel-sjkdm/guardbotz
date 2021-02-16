import admin from "firebase-admin";
//import serviceAccount from "../config/firebase.json"
const serviceAccount = require("../config/firebase.json");
//import serviceAccountJson from ""
require("dotenv").config();

const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY.replace(
	/\\n/g,
	"\n"
)
	.replace("-----BEGIN PUBLIC KEY-----", "")
	.replace("-----END PUBLIC KEY-----", "");
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;

//console.log("Service accounttt")
//console.log(serviceAccount)
/** 
admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: FIREBASE_PRIVATE_KEY,
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL
    })
});
*/
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://deployment-test-302915-default-rtdb.firebaseio.com/",
});

const db = admin.database();

export { admin, db };
