import { getConnection } from "typeorm";
import { User } from "../database/entity/User";


export const deleteUser = async (req: any, res: any) => {

    const email: string | undefined = req.body.email;
  
    if (!email) {
        res.json({
            success: false,
            error: "You must provide the user's email to be deleted",
            data: null
        }).status(400);
        return;
    }
   
    try {
    
        const r = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("email = :email", { email: email })
            .execute();

        if (r.affected !== 0) {        
            res.json({
                success: true,
                error: null,
                data: {
                    message: "The user was deleted successfully"
                }
            });
        }
        else {
            res.json({
                success: false,
                error: {
                    message: "The user doesn't exist"
                },
                data: null
            });
        }

    }
    catch (e) {
        res.json({
            success: false,
            error: {
                message: e.message,
                data: null
            }
        }).status(400);
    }
};