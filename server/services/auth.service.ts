import admin from "firebase-admin";


interface FirebaseUser {
    email: string;
    uid: string;
}


export const getUser = async (userIdentifier: string, getBy: string): Promise<object | never> => {

    let user: admin.auth.UserRecord; 

    if (getBy === "USER_EMAIL") {
        user = await admin.auth().getUserByEmail(userIdentifier);
    }
    else if (getBy === "USER_ID") {
        user = await admin.auth().getUser(userIdentifier);
    }

    if (user) {
        return user.toJSON();
    }
    else {
        throw new Error("The user doesn't exist");
    }
};
