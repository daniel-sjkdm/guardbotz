import admin from "firebase-admin";
import { getUser } from "../services/auth.service";


export const authMiddleware = async (req: any, res: any, next: any) => {

    let token: string | undefined = req.headers["authorization"];

    console.log("Token");
    console.log(token);

    if(!token) {
        res.json({ 
            success: false, 
            error: { message: "The request is not authorized" }, 
            data: null 
        }).status(403);
        return;
    }

    token = token.split(" ")[1];
    console.log("--- Token ---");
    console.log(token);

    try {
        const validToken = await admin.auth().verifyIdToken(token);
        console.log("valid token")
        console.log(validToken)
        if (validToken.email) {
            const email = validToken.email;
            const user = await getUser(email, "USER_EMAIL");
            req.currentUser = user;
            next();
        }
    }
    catch (e) {
        res.json({ success: false, error: e.message, data: null }).status(400);
    }
};
