import { getConnection } from "typeorm";
import { User } from "../database/entity/User";
import { getUserByEmail } from "../services/user.service";

export const deleteUserController = async (req: any, res: any) => {
	const email: string | undefined = req.body.email;

	if (!email) {
		res
			.json({
				success: false,
				error: "You must provide the user's email to be deleted",
				data: null,
			})
			.status(400);
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
					message: "The user was deleted successfully",
				},
			});
		} else {
			res.json({
				success: false,
				error: {
					message: "The user doesn't exist",
				},
				data: null,
			});
		}
	} catch (e) {
		res
			.json({
				success: false,
				error: {
					message: e.message,
				},
			})
			.status(400);
	}
};

export const getUserController = async (req: any, res: any) => {
	const user_email: string | undefined = req.query.user_email;

	if (!user_email) {
		res
			.json({
				success: false,
				error: "The user email is missing",
			})
			.status(400);
	}

	try {
		const user: User | null = await getUserByEmail(user_email);

		if (!user) {
			res
				.json({
					success: false,
					error: "The user wasn't found",
				})
				.status(400);
		} else {
			res.json({
				success: true,
				error: null,
				data: user,
			});
		}
	} catch (e) {
		res
			.json({
				success: false,
				error: {
					message: e.message,
				},
			})
			.status(400);
	}
};
