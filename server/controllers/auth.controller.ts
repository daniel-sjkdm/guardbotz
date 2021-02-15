import { AuthErrorResponseSchema } from "../schemas/auth.schema";
import { exception } from "console";
import { UserSearchBy } from "../enums/user.enums";
import { getUser } from "../services/auth.service";
import { createPGUser } from "../services/user.service"
import { admin } from "../fire/admin";


const MISSING_PARAMETERS: object = {
    code: "missing-parameters",
    message: "There are missing parameters"
};


const AuthResponse = (data: object): object => {
    return {
        success: true,
        error: null,
        data: data
    };
};


const AuthResponseError = (error: object): object => {
    return {
        success: false,
        error: error,
        data: null
    };
};


export const userDetailController = async (req: any, res: any) => {

    const userEmail: string = req.query.userEmail;
    const userId: string = req.query.userId;

    if (!userEmail || !userId) 
        res.json(AuthResponseError(MISSING_PARAMETERS)).status(400)

    try {
        const user = await getUser(userEmail? userEmail : userId, userEmail? "USER_EMAIL" : "USER_ID");
        res.json(AuthResponse(user));
    }
    catch (e) {
        res.json(AuthResponseError({ message: e.message })).status(400);
    }
};


export const userCreateController = async (req: any, res: any) => {

    const user: object | undefined = req.body;

    !user? res.json(AuthResponseError(MISSING_PARAMETERS)).status(400) : null

    try { 
        const newUser = await admin.auth().createUser({...user});
        const result = await createPGUser({ email: newUser.email, uid: newUser.uid });
        console.log("The pg user was created?")
        console.log(res)
        res.json(JSON.stringify(AuthResponse({}))).status(201);
    }
    catch (e) {
        console.log("Error")
        console.log(e.message)
        const error = AuthResponseError({ message: e.message });
        res.json(JSON.stringify(error)).status(400);
    }
    return;
    
};


export const userUpdateController = async (req: any, res: any) => {
    
    try {
    
        const user: admin.auth.UserRecord = req.currentUser;
        const updatedUser: admin.auth.UserRecord= await admin.auth().updateUser(user.uid, req.body); 
        res.json(AuthResponse({ message: "The user was updated successfully", user: updatedUser.toJSON() }));
    }
    catch (e) {
        res.json(AuthResponseError({ message: e.message })).status(400);
    }

};


export const userDeleteController = async (req: any, res: any) => {

    try {
        const user = req.currentUser;
        await admin.auth().deleteUser(user.uid);
        res.json(AuthResponse({ message: "The user was deleted successfully" }))
    }
    catch (e) {
        res.json(AuthResponseError({ message: e.message })).status(400);
    }
};
